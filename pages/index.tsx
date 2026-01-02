import cn from 'classnames'
import type { NextPage } from 'next'
import Head from 'next/head'
import CodeHero from '../components/code-hero/code-hero'
import DevIconList from '../components/dev-icon-list/dev-icon-list'
import ExperienceList from '../components/experience-list/experience-list'
import SectionTitle from '../components/section-title/section-title'
import CyberGrid from '../components/cyber-grid/cyber-grid'
import { EXPERIENCE, ICON_OPTIONS } from '../data'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="bg-black text-white">
      <Head>
        <title>mtgibbs.xyz</title>
        <meta name="description" content="Matt Gibbs Personal Site" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <script async defer src="https://kit.fontawesome.com/911564e118.js" crossOrigin="anonymous"></script>
        <script async defer data-website-id="1acc21de-8248-480b-9b15-999be129a1a3" src="https://mtgibbs-tracking.herokuapp.com/umami.js"></script>

        <link rel="icon" type="image/jpeg" href="/me_icon.jpg?v=2" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      </Head>

      <main className={cn(styles.main, "w-full relative bg-magnetic-black")}>
        <CyberGrid />

        <section className="relative z-10 w-full h-full px-0 py-12 sm:py-16 md:py-20 bg-transparent">
          <div className="container mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-center mb-8 glitch text-faded-cardboard" data-text="MTGIBBS.XYZ">
              <span className="hidden">MTGIBBS.XYZ</span>
            </h1>
          </div>
          <CodeHero titleText="Hi. I'm Matt." secondText='Software Developer'></CodeHero>

          <p className="container mx-auto text-xl py-16 sm:pt-24 px-8 sm:px-16 xl:px-24 text-faded-cardboard font-mono">
            I&apos;m a problem solver, craftsman, engineering leader, and mentor.
            <br />
            <br />
            I&apos;ve spent my career helping teams navigate complexity—modernizing legacy systems, designing scalable platforms, and turning ambiguous problems into durable, well-designed software. My background spans finance, application security, and data platforms, with experience across high-volume transaction systems, cloud-native architectures, web frameworks, and DevSecOps.
            <br />
            <br />
            I&apos;m particularly drawn to front-end engineering, developer experience, and demystifying technology. I enjoy building environments where engineers can do their best work and where systems are understandable, resilient, and built to last.
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

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-static-grey border-t-4 border-chrome-blue">
          <div className="mb-12">
            <SectionTitle title='Experience'></SectionTitle>
          </div>
          <ExperienceList experienceItems={EXPERIENCE}></ExperienceList>
        </section>

        <section className="relative z-10 w-full h-full px-0 sm:px-5 py-24 pb-16 bg-magnetic-black border-t-4 border-signal-orange">
          <div className="mb-12">
            <SectionTitle title='Technologies'></SectionTitle>
          </div>
          <DevIconList icons={ICON_OPTIONS}></DevIconList>
        </section>

      </main>

      {/* <footer className={styles.footer}>

      </footer> */}
    </div >
  )
}

export default Home
