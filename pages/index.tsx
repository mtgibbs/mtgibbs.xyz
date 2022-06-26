import cn from 'classnames'
import type { NextPage } from 'next'
import Head from 'next/head'
import CodeHero from '../components/code-hero/code-hero'
import DevIconList from '../components/dev-icon-list/dev-icon-list'
import ExperienceList from '../components/experience-list/experience-list'
import SectionTitle from '../components/section-title/section-title'
import { EXPERIENCE, ICON_OPTIONS } from '../data'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="bg-blue">
      <Head>
        <title>mtgibbs.xyz</title>
        <meta name="description" content="Matt Gibbs Personal Site" />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"></link>
        <script src="https://kit.fontawesome.com/911564e118.js" crossOrigin="anonymous"></script>
        <script async defer data-website-id="1acc21de-8248-480b-9b15-999be129a1a3" src="https://mtgibbs-tracking.herokuapp.com/umami.js"></script>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      </Head>

      <main className={cn(styles.main, "min-w-[36em]")}>

        <section className="w-full h-full px-0 py-12 sm:py-16 md:py-20 bg-white">
          <CodeHero titleText="Hi. I'm Matt." secondText='Software Developer'></CodeHero>

          <p className="container mx-auto text-xl py-16 sm:pt-24 px-8 sm:px-16 xl:px-24">
            I&apos;m a problem solver, a craftsman, a developer, and mentor. I&apos;ve worked in several industries, from finance
            to software security, and in several problem domains like high-volume transaction processing systems, legacy modernization,
            web frameworks, large data analysis, code analysis, and DevSecOps. My passions are in front-end development, gaming,
            and demystifying technology.
          </p>

          <div className="flex flex-col sm:flex-row h-24 sm:h-auto mt-4 mb-8 sm:my-0 justify-center content-evenly items-center">

            <a className="text-2xl mx-4 my-1 text-orange" href="https://github.com/mtgibbs">
              GitHub <i className="fa fa-github"></i>
            </a>
            <a className="text-2xl mx-4 my-1 text-red" href="https://www.linkedin.com/in/mtgibbs21">
              LinkedIn <i className="fa fa-linkedin"></i>
            </a>
            <a className="text-2xl mx-4 my-1 text-magenta" href="mailto:matt@mtgibbs.xyz">
              Email <i className="fa fa-envelope-square"></i>
            </a>
            <a className="text-2xl mx-4 my-1 text-purple" href="https://discordapp.com/users/pwnysenpai#6317/">
              Discord <i className="fab fa-discord"></i>
            </a>
          </div>

        </section>

        <section className="w-full h-full px-0 sm:px-5 py-24 pb-16 bg-gradient-to-tl bg-blue">
          <SectionTitle title='Experience'></SectionTitle>
          <ExperienceList experienceItems={EXPERIENCE}></ExperienceList>
        </section>

        <section className="w-full h-full px-0 sm:px-5 py-24 pb-16 bg-white">
          <SectionTitle title='Technologies'></SectionTitle>
          <DevIconList icons={ICON_OPTIONS}></DevIconList>
        </section>

      </main>

      {/* <footer className={styles.footer}>

      </footer> */}
    </div >
  )
}

export default Home
