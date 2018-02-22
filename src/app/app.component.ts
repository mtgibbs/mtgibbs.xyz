import { Component } from '@angular/core';
import { IExperienceItem } from './experience-item/experience-item.component';
import { IProfessionalConnectionLink } from './professional-connection-link/professional-connection-link.component';

import { EXPERIENCE } from './data/experience-items'
import { LINKS } from './data/professional-links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public experience: IExperienceItem[] = EXPERIENCE;
  public links: IProfessionalConnectionLink[] = LINKS;
}
