import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IProfessionalConnectionLink } from './model/professional-connection-link';

@Component({
  selector: 'mtg-professional-connection-link',
  template: `
    <a [attr.aria-label]="text" class="decoration-slice bg-gradient-to-b min-w-min from-orange-light to-orange-dark text-center text-transparent bg-clip-text py-2 px-4 text-2xl" [href]="uri">
      {{ text }} <i [class]="icon"></i>
    </a>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalConnectionLinkComponent implements OnInit {

  @Input() link?: IProfessionalConnectionLink;

  constructor() { }

  get text() {
    return this.link?.text;
  }

  get uri() {
    return this.link?.uri;
  }

  get icon() {
    return this.link?.icon;
  }

  ngOnInit() {
  }

}
