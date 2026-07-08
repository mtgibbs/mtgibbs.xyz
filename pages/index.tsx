import cn from 'classnames'
import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import CodeHero from '../components/code-hero/code-hero'
import DevIconList from '../components/dev-icon-list/dev-icon-list'
import ExperienceList from '../components/experience-list/experience-list'
import SectionTitle from '../components/section-title/section-title'
import CyberGrid from '../components/cyber-grid/cyber-grid'
import Footer from '../components/footer/footer'
import SpotifyCard from '../components/spotify/spotify-card'
import SystemLogs from '../components/system-logs/system-logs'
import SystemAnomalies from '../components/system-anomalies/system-anomalies'
import ProjectDeck from '../components/project-deck/project-deck'
import { EXPERIENCE, ICON_OPTIONS, PROJECTS } from '../data'
import { getPinnedProjects, getRepoCatalog } from '../lib/github'
import { IProject } from '../components/project-deck/model/project'
import { IStarCatalog } from '../components/project-deck/model/repo-star'
import styles from '../styles/Home.module.css'

interface HomeProps {
  pinnedProjects: IProject[];
  repoCatalog: IStarCatalog;
}

const Home: NextPage<HomeProps> = ({ pinnedProjects, repoCatalog }) => {
  // Use pinned projects from GitHub. If empty, we pass empty array to trigger Offline/Jammed state in ProjectDeck.
  const displayProjects = pinnedProjects || [];

  return (
    <div className="bg-black text-white">
      <Head>
        <title>mtgibbs.xyz</title>
        <meta name="description" content="Matt Gibbs Personal Site" />
      </Head>

      <Script src="https://kit.fontawesome.com/911564e118.js" crossOrigin="anonymous" strategy="afterInteractive" />


      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-signal-orange focus:text-white focus:outline-none focus:ring-2 focus:ring-white font-mono font-bold"
      >
        SKIP TO CONTENT
      </a>

      <main id="main-content" className={cn(styles.main, "w-full relative bg-magnetic-black overflow-x-hidden")}>
        <CyberGrid />

        <section className="relative z-10 w-full h-full px-0 py-12 sm:py-16 md:py-20 bg-transparent text-faded-cardboard">
          <div className="w-full max-w-7xl mx-auto relative">
            {/* Desktop Spotify Player - Drifting in Hero Space */}
            <div className="hidden lg:block absolute -top-[1%] right-8 z-20">
              <div className="rotate-3 opacity-90 hover:rotate-0 hover:scale-105 transition-all duration-500">
                <SpotifyCard />
              </div>
            </div>

            <div className="container mx-auto">
              <h1 className="text-6xl md:text-8xl font-bold text-center mb-8 glitch opacity-20" data-text="MTGIBBS.XYZ">
                <span className="sr-only">MTGIBBS.XYZ</span>
              </h1>
            </div>
            <CodeHero
              titleText="Hi. I'm Matt."
              secondText="Building Teams & Software"
              secondTextDesktop={"Building Teams\n& Software"}
            ></CodeHero>

            <p className="container mx-auto text-xl py-16 sm:pt-24 px-8 sm:px-16 xl:px-24 font-mono">

              I&apos;m a problem solver, craftsman, engineering leader, and mentor.
              <br />
              <br />
              Most of my career has been spent working through complexity and helping teams untangle it. I&apos;ve modernized legacy systems, designed platforms that scale, and helped turn unclear problems into software that lasts. Along the way, I&apos;ve worked across finance, application security, and data platforms, often in systems that had to be both reliable and easy to reason about.
              <br />
              <br />
              I&apos;m particularly drawn to product engineering and developer experience. I care about building systems and teams that make good work easier, and about demystifying technology so it feels more approachable and less fragile.
              <br />
              <br />
              Right now that means AI-assisted engineering: agent harnesses, evaluation gates in CI, and measuring what agents do instead of taking their word for it. My homelab runs the same experiments — a GitOps K3s cluster with MCP servers and agent loops. Every build of this site lands there too.

            </p>

            <div className="flex flex-col sm:flex-row h-24 sm:h-auto mt-4 mb-8 sm:my-0 justify-center content-evenly items-center">

              <a className="text-2xl mx-4 my-1 text-signal-orange hover:text-phosphor-amber transition-colors flex items-center gap-2" href="https://github.com/mtgibbs">
                GitHub <i className="devicon-github-original"></i>
              </a>
              <a className="text-2xl mx-4 my-1 text-tracking-red hover:text-signal-orange transition-colors flex items-center gap-2" href="https://www.linkedin.com/in/mtgibbs21">
                LinkedIn <i className="devicon-linkedin-plain"></i>
              </a>
              <a className="text-2xl mx-4 my-1 text-chrome-blue hover:text-faded-cardboard transition-colors flex items-center gap-2" href="mailto:matt@mtgibbs.xyz">
                Email <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
              <a className="text-2xl mx-4 my-1 text-faded-cardboard hover:text-white transition-colors flex items-center gap-2" href="https://discordapp.com/users/pwnysenpai#6317/">
                Discord <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
              </a>
            </div>
          </div>

        </section>

        <section className="relative z-10 w-full bg-magnetic-black px-8 sm:px-16 xl:px-24 py-12">
          <div className="container mx-auto max-w-4xl">
            <SystemLogs />
          </div>
        </section>

        {/* System Anomalies moved below Projects */}

        <section className="relative z-10 w-full h-full px-0 py-24 pb-16 bg-static-grey border-t-4 border-chrome-blue">
          {/* Section Title - Decoupled from content centering to maintain standard left alignment */}
          <div className="px-0 sm:px-5 mb-12 lg:mb-16">
            <SectionTitle title='Experience' color="blue" classKey="EXP_LOG"></SectionTitle>
          </div>

          {/* Responsive Content Container: Full width on mobile, centered/constrained on desktop */}
          <div className="w-full lg:max-w-7xl lg:mx-auto">
            <ExperienceList experienceItems={EXPERIENCE}></ExperienceList>
          </div>
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-magnetic-black border-t-4 border-signal-orange">
          <div className="absolute inset-0 bg-vhs-stripes pointer-events-none z-0 mix-blend-overlay opacity-30"></div>
          <div className="relative z-10">
            <SectionTitle title='Projects' color="orange" classKey="PROJ_DB"></SectionTitle>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ProjectDeck projects={displayProjects} catalog={repoCatalog} />
          </div>
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-magnetic-black border-t-4 border-tracking-red">
          <div className="absolute inset-0 bg-vhs-stripes pointer-events-none z-0 mix-blend-overlay opacity-50"></div>
          <SystemAnomalies />
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-static-grey border-t-4 border-chrome-blue">
          <div>
            <SectionTitle title='Technologies' color="blue" classKey="TECH_SYS"></SectionTitle>
          </div>
          <DevIconList icons={ICON_OPTIONS}></DevIconList>
        </section>

      </main>

      <Footer />

      {/* <footer className={styles.footer}>

      </footer> */}
    </div >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [pinnedProjects, repoCatalog] = await Promise.all([
    getPinnedProjects(),
    getRepoCatalog(),
  ]);
  return {
    props: {
      pinnedProjects,
      repoCatalog,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default Home
