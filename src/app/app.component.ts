import { Component } from '@angular/core';
import { IExperienceItem } from './experience-item/experience-item.component';
import { IProfessionalConnectionLink } from './professional-connection-link/professional-connection-link.component';
import { IDevIconOptions } from './dev-icon/dev-icon.component';

import { EXPERIENCE } from './data/experience-items';
import { LINKS } from './data/professional-links';
import { EDUCATION } from './data/education-items';
import { ICON_OPTIONS } from './data/skills-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'mtgibbs.xyz';

  public experience: IExperienceItem[] = EXPERIENCE;
  public links: IProfessionalConnectionLink[] = LINKS;
  public education: IExperienceItem[] = EDUCATION;
  public skillIcons: IDevIconOptions[] = ICON_OPTIONS;
}
