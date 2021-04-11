import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IExperienceItem } from './model/experience-list-item';

@Component({
    selector: 'mtg-experience-item',
    template: `
        <div class="experience-item-container">
            <div [attr.index]="index">
            <div class="absolute z-0 inset-0 bg-gradient-to-r from-orange-light to-orange shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-md w-screen sm:w-full"></div>
                <div class="experience-details relative bg-gray-100">
                    <h3 class="font-bold">{{ experienceItem.title }}</h3>
                    <div class="font-light">{{ experienceItem.subTitle }}</div>
                    <p class="text-lg p-4">{{ experienceItem.description }}</p>
                    <div *ngIf="experienceItem.startDate && experienceItem.endDate" class="float-right relative">
                        <span class="text-primary">{{ experienceItem.startDate }} - {{ experienceItem.endDate }}</span>
                    </div>
                </div>
               
            </div>
        </div>
    `,
    styleUrls: ['./experience-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceItemComponent implements OnInit {

    @Input() experienceItem: IExperienceItem = {
        title: '',
        description: '',
    }

    @Input() index: number = 0;

    constructor() { }

    ngOnInit(): void {
    }

}
