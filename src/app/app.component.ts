import { Component } from '@angular/core';
import { EXPERIENCE, ICON_OPTIONS } from 'src/data';

@Component({
  selector: 'app-root',
  template: `

    <!-- <mtg-nav></mtg-nav> -->
    <main class="max-h-screen overflow-y-scroll">
      <section class="w-full h-full py-24 bg-gray-200">
        <mtg-code-hero [titleText]="codeHeroLabelText" [secondText]="codeHeroSecondText"></mtg-code-hero>
        <p class="container mx-auto py-16 pt-24 px-24">
          Bacon ipsum dolor amet rump kielbasa hamburger fatback filet mignon pig porchetta chuck, turkey short ribs corned beef ground round. Bacon capicola fatback bresaola jerky shank picanha pancetta salami pork, short loin tenderloin hamburger pork loin alcatra. Ground round bresaola alcatra ball tip tongue, leberkas capicola short loin ribeye burgdoggen sirloin kevin boudin. Bacon spare ribs burgdoggen turkey. Tail bresaola boudin beef ribs meatball ham hock, turkey spare ribs porchetta pork tri-tip bacon prosciutto. Porchetta alcatra pork belly turkey beef pig.
        </p>
      </section>
      <section class="w-full h-full py-24 bg-gradient-to-tl from-indigo-lightest via-indigo-light to-indigo bg-indigo-light">
        <mtg-section-title title="Experience"></mtg-section-title>
        <mtg-experience-list [experienceItems]="EXPERIENCE"></mtg-experience-list>
      </section>
      <section class="w-full h-full py-24 bg-gray-200">
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

}
