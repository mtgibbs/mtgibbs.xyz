import { Component } from '@angular/core';
import { EXPERIENCE, ICON_OPTIONS, LINKS } from 'src/data';

@Component({
  selector: 'app-root',
  template: `

    <!-- <mtg-nav></mtg-nav> -->
    <main class="max-h-screen overflow-y-scroll">
      <section class="w-full h-full px-0 sm:px-5 py-12 sm:py-16 md:py-20 bg-gray-200">
        <mtg-code-hero [titleText]="codeHeroLabelText" [secondText]="codeHeroSecondText"></mtg-code-hero>
        <p class="container mx-auto py-16 sm:pt-24 px-8 sm:px-24">
        Actually more of just a problem solver. I am currently a Software Development Manager leading a team of
        six full-stack engineers working on a legacy UI modernization project on <a href="https://www.onedatascan.com/solutions/wholesale-intelligence/">DataScan's Wholesale Intelligence Platform</a>.
        I've worked in several industries, from insurance to software security, and in several problem domains like high volume transaction processing systems,
        legacy modernization, and web interfaces.
        </p>
        <div class="flex flex-col sm:flex-row h-24 sm:h-auto mt-4 mb-8 sm:my-0 justify-center content-evenly items-center">
          <mtg-professional-connection-link 
            class="text-center my-2"
            *ngFor="let link of LINKS"
            [link]="link" ></mtg-professional-connection-link>
        </div>
      </section>
      <section class="w-full h-full px-0 sm:px-5 py-24 pb-16 bg-gradient-to-tl from-indigo-lightest via-indigo-light to-indigo">
        <mtg-section-title title="Experience"></mtg-section-title>
        <mtg-experience-list [experienceItems]="EXPERIENCE"></mtg-experience-list>
      </section>
      <section class="w-full h-full px-0 sm:px-5 py-24 pb-16 bg-gray-200">
        <mtg-section-title title="Technologies"></mtg-section-title>
        <mtg-dev-icon-list [icons]="ICON_OPTIONS"></mtg-dev-icon-list>
      </section>
    </main>
  `,
  styles: []
})
export class AppComponent {

  readonly codeHeroLabelText: string = `Hi. I'm Matt.`;
  readonly codeHeroSecondText: string = `SOFTWARE DEVELOPER`;
  readonly EXPERIENCE = EXPERIENCE;
  readonly ICON_OPTIONS = ICON_OPTIONS;
  readonly LINKS = LINKS;
}
