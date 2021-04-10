import { Component } from '@angular/core';
import { EXPERIENCE, ICON_OPTIONS } from 'src/data';

@Component({
  selector: 'app-root',
  template: `

    <!-- <mtg-nav></mtg-nav> -->
    <main class="max-h-screen overflow-y-scroll">
      <section class="w-full h-screen bg-gray-200 snap-start">
        <mtg-code-hero [titleText]="codeHeroLabelText"></mtg-code-hero>
      </section>
      <section class="w-full h-screen bg-indigo-light snap-start">
        <h1 class="text-lg font-bold bg-orange-light text-gray-100 w-96 px-8 py-4 transform -rotate-3 text-center rounded-md shadow-lg tracking-wider">EXPERIENCE</h1>
        <mtg-experience-list [experienceItems]="EXPERIENCE"></mtg-experience-list>
      </section>
      <section class="w-full h-screen bg-gray-200 snap-start">
      <h1 class="text-lg font-bold bg-orange-light text-gray-100 w-96 px-8 py-4 transform -rotate-3 text-center rounded-md shadow-lg tracking-wider">TECHNOLOGIES</h1>
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
