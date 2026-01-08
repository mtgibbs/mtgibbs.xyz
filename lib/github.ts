import { IProject } from '../components/project-deck/model/project';

const GITHUB_USERNAME = 'mtgibbs';

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

    return pinnedNodes.map((repo: any) => ({
      id: repo.url,
      title: repo.name,
      description: repo.description,
      techStack: repo.languages.nodes.map((l: any) => l.name),
      link: repo.homepageUrl || null,
      repo: repo.url,
      year: new Date(repo.createdAt).getFullYear().toString()
    }));
  } catch (err) {
    console.error('Failed to fetch pinned projects:', err);
    return [];
  }
}
