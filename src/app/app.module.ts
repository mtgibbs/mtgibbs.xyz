import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CodeHeroModule } from './code-hero/code-hero.module';
import { HttpClientModule } from '@angular/common/http';
import { ExperienceListModule } from './experience-list/experience-list.module';
import { DevIconListModule } from './dev-icon-list/dev-icon-list.module';
import { SectionTitleComponent } from './section-title/section-title.component';
import { ProfessionalConnectionLinkComponent } from './professional-connection-link/professional-connection-link.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionTitleComponent,
    ProfessionalConnectionLinkComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    CodeHeroModule,
    ExperienceListModule,
    DevIconListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
