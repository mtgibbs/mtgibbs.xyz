import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IExperienceItem } from './model/experience-list-item';

@Component({
    selector: 'mtg-experience-item',
    template: `
        <div class="experience-item-container">
            <div [ngClass]="{'even': index % 2 === 0, 'odd': index % 2 === 1 }" [attr.index]="index">
                <div class="backdrop-accent"></div>
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
