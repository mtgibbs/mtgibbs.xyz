import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent implements OnInit {

  @Input() item: IExperienceItem;

  constructor() { }

  ngOnInit() {
  }

}

export interface IExperienceItem {
  title: string;
  subTitle: string | null;
  description: string;
  startDate: string;
  endDate: string;
}