import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceListComponent } from './experience-list.component';
import { ExperienceItemComponent } from './experience-item.component';

@NgModule({
  declarations: [
    ExperienceItemComponent,
    ExperienceListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExperienceListComponent
  ]
})
export class ExperienceListModule { }
