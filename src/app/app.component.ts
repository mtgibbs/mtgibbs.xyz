import { Component } from '@angular/core';
import { EXPERIENCE, ICON_OPTIONS } from 'src/data';

@Component({
  selector: 'app-root',
  template: `

    <!-- <mtg-nav></mtg-nav> -->
    <main class="max-h-screen overflow-y-scroll">
      <section class="w-full h-full py-24 bg-gray-200">
        <mtg-code-hero [titleText]="codeHeroLabelText"></mtg-code-hero>
      </section>
      <section class="w-full h-full py-24 bg-indigo-light">
        <mtg-section-title title="Experience"></mtg-section-title>
        <mtg-experience-list [experienceItems]="EXPERIENCE"></mtg-experience-list>
      </section>
      <section class="w-full h-full py-24 bg-gray-200">
        <mtg-section-title title="Technologies"></mtg-section-title>
        <mtg-dev-icon-list [icons]="ICON_OPTIONS"></mtg-dev-icon-list>
      </section>
      <!-- <section class="w-full h-screen bg-indigo-200 snap-start">
        Section 4
      </section>
      <section class="w-full h-screen bg-yellow-200 snap-start">
        Section 5
      </section> -->
    </main>
  `,
  styles: []
})
export class AppComponent {

  readonly codeHeroLabelText: string = `Hi. I'm Matt.`;
  readonly EXPERIENCE = EXPERIENCE;
  readonly ICON_OPTIONS = ICON_OPTIONS;

}
