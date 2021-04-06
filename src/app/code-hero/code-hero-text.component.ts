import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'mtg-code-hero-text',
    template: `
        <code style="white-space: pre-line;">
           <pre>{{ visibleText }}</pre>
        </code>
    `,
    styles: [
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeHeroTextComponent implements OnInit, OnChanges {

    @Input() codeText: string = '';
    @Input() characterPointerLocation: number = 0;

    visibleText: string = '';

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        this.visibleText = this.codeText.substr(0, this.characterPointerLocation);
    }

    ngOnInit(): void {
    }

}
