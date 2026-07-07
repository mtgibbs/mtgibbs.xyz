import { IProject } from '../components/project-deck/model/project';
import { IStarCatalog, IRepoStar } from '../components/project-deck/model/repo-star';

const GITHUB_USERNAME = 'mtgibbs';

// Build-time fetch of the full repo catalog for the star chart.
// Public repos become named stars; private repos contribute ONLY a count
// (rendered as unnamed classified contacts — names never ship).
export async function getRepoCatalog(): Promise<IStarCatalog> {
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!token) {
    console.warn('GITHUB_ACCESS_TOKEN missing — star chart ships without catalog');
    return { repos: [], privateCount: 0 };
  }

  try {
    const res = await fetch('https://api.github.com/user/repos?per_page=100&affiliation=owner', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!res.ok) {
      console.error('GitHub repo catalog fetch failed:', res.status);
      return { repos: [], privateCount: 0 };
    }

    const all = await res.json();
    const repos: IRepoStar[] = all
      .filter((r: any) => !r.private)
      .map((r: any) => ({
        name: r.name,
        createdYear: new Date(r.created_at).getFullYear(),
        pushedAt: r.pushed_at,
        sizeKb: r.size,
        fork: r.fork,
      }));
    const privateCount = all.filter((r: any) => r.private).length;

    return { repos, privateCount };
  } catch (err) {
    console.error('Failed to fetch repo catalog:', err);
    return { repos: [], privateCount: 0 };
  }
}

export async function getPinnedProjects(): Promise<IProject[]> {
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!token) {
    console.warn('GITHUB_ACCESS_TOKEN is not defined in environment variables');
    return [];
  }

  const query = `
    {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              createdAt
              languages(first: 4, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  name
                }
              }
              repositoryTopics(first: 6) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error('GitHub GraphQL errors:', json.errors);
      return [];
    }

    const pinnedNodes = json.data?.user?.pinnedItems?.nodes || [];

    return pinnedNodes.map((repo: any) => {
      const languages = repo.languages?.nodes?.map((l: any) => l.name.toUpperCase()) || [];
      const topics = repo.repositoryTopics?.nodes?.map((t: any) => t.topic.name.toUpperCase()) || [];
      // Deduplicate and combine (case-insensitivity handled by uppercasing first)
      const techStack = Array.from(new Set([...languages, ...topics]));

      return {
        id: repo.url,
        title: repo.name,
        description: repo.description,
        techStack,
        link: repo.homepageUrl || null,
        repo: repo.url,
        year: new Date(repo.createdAt).getFullYear().toString()
      };
    });
  } catch (err) {
    console.error('Failed to fetch pinned projects:', err);
    return [];
  }
}
