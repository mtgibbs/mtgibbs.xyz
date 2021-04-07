import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="bg-gray-200 h-screen">
      <mtg-code-hero [titleText]="codeHeroLabelText"></mtg-code-hero>
    </div>
  `,
  styles: []
})
export class AppComponent {
  
  readonly codeHeroLabelText: string = `Hi. I'm Matt.`;
  
}
