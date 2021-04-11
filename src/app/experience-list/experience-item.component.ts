import { Component, Input, OnInit } from '@angular/core';
import { IExperienceItem } from './model/experience-list-item';

@Component({
    selector: 'mtg-experience-item',
    template: `
        <div class="container mx-auto rounded-none sm:rounded-md bg-gray-100 shadow-md p-8 my-16">
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
