import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { ExperienceItemListComponent } from './experience-item-list/experience-item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExperienceItemComponent,
    ExperienceItemListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
