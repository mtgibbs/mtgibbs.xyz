import { Component, Input, OnInit } from '@angular/core';
import { IDevIconOptions } from './model/dev-icon-options';

@Component({
  selector: 'mtg-dev-icon-list',
  template: `
    <div class="container mx-auto flex flex-row flex-wrap content-center h-full">
      <div class="p-2" *ngFor="let option of icons">
        <mtg-dev-icon [options]="option"></mtg-dev-icon>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class DevIconListComponent implements OnInit {

  @Input() icons: IDevIconOptions[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
