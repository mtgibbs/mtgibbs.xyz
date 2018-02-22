import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { ExperienceItemListComponent } from './experience-item-list/experience-item-list.component';
import { ProfessionalConnectionLinkComponent } from './professional-connection-link/professional-connection-link.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExperienceItemComponent,
    ExperienceItemListComponent,
    ProfessionalConnectionLinkComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
