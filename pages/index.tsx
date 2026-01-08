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
import ProjectDeck from '../components/project-deck/project-deck'
import { EXPERIENCE, ICON_OPTIONS, PROJECTS } from '../data'
import { getPinnedProjects } from '../lib/github'
import { IProject } from '../components/project-deck/model/project'
import styles from '../styles/Home.module.css'

interface HomeProps {
  pinnedProjects: IProject[];
}

const Home: NextPage<HomeProps> = ({ pinnedProjects }) => {
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
          {/* Desktop Spotify Player - Drifting in Hero Space */}
          <div className="hidden lg:block absolute top-[10%] right-8 z-20">
            <div className="rotate-3 opacity-90 hover:rotate-0 hover:scale-105 transition-all duration-500">
              <SpotifyCard />
            </div>
          </div>

          <div className="container mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-center mb-8 glitch opacity-20" data-text="MTGIBBS.XYZ">
              <span className="sr-only">MTGIBBS.XYZ</span>
            </h1>
          </div>
          <CodeHero titleText="Hi. I'm Matt." secondText='Software Developer'></CodeHero>

          <p className="container mx-auto text-xl py-16 sm:pt-24 px-8 sm:px-16 xl:px-24 font-mono">

            I&apos;m a problem solver, craftsman, engineering leader, and mentor.
            <br />
            <br />
            Most of my career has been spent working through complexity and helping teams untangle it. I&apos;ve modernized legacy systems, designed platforms that scale, and helped turn unclear problems into software that lasts. Along the way, I&apos;ve worked across finance, application security, and data platforms, often in systems that had to be both reliable and easy to reason about.
            <br />
            <br />
            I&apos;m particularly drawn to front-end engineering and developer experience. I care about building systems and teams that make good work easier, and about demystifying technology so it feels more approachable and less fragile.

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
              Discord <i className="devicon-discord-original"></i>
            </a>
          </div>

        </section>

        <section className="relative z-10 w-full bg-magnetic-black px-8 sm:px-16 xl:px-24 py-12">
          <div className="container mx-auto max-w-4xl">
            <SystemLogs />
          </div>
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-static-grey border-t-4 border-chrome-blue">
          <div>
            <SectionTitle title='Experience' color="blue"></SectionTitle>
          </div>
          <ExperienceList experienceItems={EXPERIENCE}></ExperienceList>
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-magnetic-black border-t-4 border-signal-orange">
          <div className="absolute inset-0 bg-vhs-stripes pointer-events-none z-0 mix-blend-overlay opacity-30"></div>
          <div className="relative z-10">
            <SectionTitle title='Projects' color="orange"></SectionTitle>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <ProjectDeck projects={displayProjects} />
          </div>
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-static-grey border-t-4 border-chrome-blue">
          <div>
            <SectionTitle title='Technologies' color="blue"></SectionTitle>
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
  const pinnedProjects = await getPinnedProjects();
  return {
    props: {
      pinnedProjects,
    },
    revalidate: 60 * 60, // 1 hour
  };
};

export default Home
