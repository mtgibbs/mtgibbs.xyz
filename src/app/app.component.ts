import { Component } from '@angular/core';
import { IExperienceItem } from './experience-item/experience-item.component';
import { EXPERIENCE } from './data/experience-items'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public experience: IExperienceItem[] = EXPERIENCE;
}
