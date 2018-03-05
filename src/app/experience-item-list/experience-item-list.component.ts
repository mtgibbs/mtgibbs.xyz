import { Component, Input, OnInit } from '@angular/core';
import { IExperienceItem } from '../experience-item/experience-item.component';

@Component({
  selector: 'app-experience-item-list',
  templateUrl: './experience-item-list.component.html',
  styleUrls: ['./experience-item-list.component.scss']
})
export class ExperienceItemListComponent implements OnInit {

  @Input() items: Array<IExperienceItem>;
  
  constructor() { }

  ngOnInit() {
  }

}
