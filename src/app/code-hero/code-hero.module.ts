import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHeroComponent } from './code-hero.component';
import { CodeHeroTextComponent } from './code-hero-text.component';

@NgModule({
  declarations: [
    CodeHeroComponent,
    CodeHeroTextComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CodeHeroComponent
  ]
})
export class CodeHeroModule { }
