import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-icon',
  templateUrl: './dev-icon.component.html',
  styleUrls: ['./dev-icon.component.scss']
})
export class DevIconComponent implements OnInit {

  @Input() options: IDevIconOptions;

  constructor() { }

  ngOnInit() {
  }

  
  get class() {

    // how's this for bad patterns?
    // likelihood half of the icons don't work now is quite high
    let result = `devicon-${this.options.icon}-plain`;
    if (this.options.isWordmark)
      result += '-wordmark';
    if (this.options.isColor)
      result += ' colored';

    return result;
  }

}

export interface IDevIconOptions {
  isColor: boolean;
  icon: string;
  isWordmark: boolean;
}
