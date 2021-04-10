import { Component, Input, OnInit } from '@angular/core';
import { IExperienceItem } from './model/experience-list-item';

@Component({
    selector: 'mtg-experience-item',
    template: `
        <div class="container mx-auto rounded-xl bg-gray-100 shadow-md p-8 m-8">
            <div class="resume-content mr-auto">
                <h3 class="font-bold">{{ experienceItem.title }}</h3>
                <div class="font-light">{{ experienceItem.subTitle }}</div>
                <p class="text-lg p-4">{{ experienceItem.description }}</p>
            </div>
            <div *ngIf="experienceItem.startDate && experienceItem.endDate" class="float-right">
                <span class="text-primary">{{ experienceItem.startDate }} - {{ experienceItem.endDate }}</span>
            </div>
        </div>
  `,
    styles: [
    ]
})
export class ExperienceItemComponent implements OnInit {

    @Input() experienceItem: IExperienceItem = {
        title: '',
        description: '',
    }

    constructor() { }

    ngOnInit(): void {
    }

}
