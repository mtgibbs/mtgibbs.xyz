import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IDevIconOptions } from './model/dev-icon-options';
import { DevIconStyles } from './model/dev-icon-styles';

@Component({
  selector: 'mtg-dev-icon',
  template: `
    <i [title]="title" class="text-7xl m-2" [class]="class"></i>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevIconComponent implements OnInit {

  @Input() options: IDevIconOptions = {
    icon: '',
    isColor: false,
    isWordmark: false,
    style: DevIconStyles.Plain
  }

  constructor() { }

  ngOnInit(): void {
  }

  get class(): string {

    // how's this for bad patterns?
    // likelihood half of the icons don't work now is quite high
    let result = `devicon-${this.options.icon}-${this.options.style}`;
    if (this.options.isWordmark)
      result += '-wordmark';
    if (this.options.isColor) {
      result += ' colored';
    }
    else {
      result += " text-indigo-light"
    }

    return result;
  }

  get title(): string {
    return this.options.icon;
  }

}
