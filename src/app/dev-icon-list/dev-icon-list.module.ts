import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevIconListComponent } from './dev-icon-list.component';
import { DevIconComponent } from './dev-icon.component';

@NgModule({
  declarations: [
    DevIconListComponent,
    DevIconComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DevIconListComponent
  ]
})
export class DevIconListModule { }
