import { Component, Input, OnInit } from '@angular/core';
import { IExperienceItem } from './model/experience-list-item';

@Component({
  selector: 'mtg-experience-list',
  template: `
    <div class="my-12 flex flex-col space-y-12">
      <mtg-experience-item *ngFor="let exp of experienceItems; let i = index;" [experienceItem]="exp" [index]="i"></mtg-experience-item>
    </div>
  `,
  styles: [
  ]
})
export class ExperienceListComponent implements OnInit {

  @Input() experienceItems: IExperienceItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
