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
        <link rel="icon" href="/favicon.ico" />
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
