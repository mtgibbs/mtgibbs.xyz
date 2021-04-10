import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mtg-code-hero',
  template: `

    <div class="container relative mx-auto">
      <div class="absolute z-0 inset-0 bg-gradient-to-r from-teal-lightest to-indigo-light shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative z-10 h-96 p-4 sm:rounded-3xl  bg-gray-800 border-gray-900 shadow-md ">
        <div class="object-cover font-mono text-gray-200 h-full py-4 overflow-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded select-none">
          <mtg-code-hero-text [codeText]="codeText" [characterPointerLocation]="index"></mtg-code-hero-text>
        </div>
      </div>
      <div *ngIf="titleText" class="absolute w-full inset-y-1/2 h-9 object-center text-center z-20">
        <span class="bg-gray-900 text-2xl text-teal-light font-bold p-8 sm:rounded-3xl border-4 border-teal-light">{{ titleText }}</span>
      </div>
    </div>
   
  `,
  styles: [
  ]
})
export class CodeHeroComponent implements OnInit {

  private _files = [
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-labelclasses/master/src/scripts/chartist-plugin-labelclasses.js',
    'https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/index.js',
    'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-barlabels/master/src/scripts/chartist-plugin-barlabels.js',
    'https://raw.githubusercontent.com/mtgibbs/estudu/master/js/main.js',
    'https://raw.githubusercontent.com/mtgibbs/NapkinTour/master/napkin.tour.js',
    'https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/test/main.js',
    'https://raw.githubusercontent.com/mtgibbs/hubot-fod/master/src/hubot-fod.ts',
    'https://raw.githubusercontent.com/mtgibbs/hubot-fod/master/index.ts'
  ];

  @Input() titleText = '';

  codeText: string = '';
  index: number = 0;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    const randomFile = this._files[Math.floor(Math.random() * this._files.length)];
    this.httpClient.get(randomFile, { responseType: 'text' }).subscribe(codeText => {
      this.codeText = codeText;
      this.startTypingTimer(this.codeText.length, 45, 15);
    });

  }

  private startTypingTimer(maxTimes: number, delay: number, drift: number) {

    const timerCb = () => {

      if (this.index > maxTimes) {
        return;
      }

      let driftTime = Math.floor(Math.random() * drift) + 1;
      driftTime *= Math.round(Math.random()) ? 1 : -1;
      const nextTimeoutDelay = delay + driftTime;
      this.index++;

      window.setTimeout(timerCb, nextTimeoutDelay);
    };

    timerCb();

  }

}
