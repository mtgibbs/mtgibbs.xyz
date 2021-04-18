import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from '../window.service';

@Component({
  selector: 'mtg-code-hero',
  template: `

    <div aria-hidden role=”presentation” class="container relative mx-auto">
      <div class="absolute z-0 inset-0 bg-gradient-to-r from-orange-light to-indigo-lightest shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
      <div class="relative z-10 h-96 p-4 sm:rounded-lg  bg-gray-800 border-gray-900 shadow-md ">
        <div class="object-cover font-mono text-gray-200 h-full py-4 overflow-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded select-none">
          <mtg-code-hero-text [codeText]="codeText" [characterPointerLocation]="index"></mtg-code-hero-text>
        </div>
      </div>
      <div class="absolute w-full h-72 sm:h-64 overflow-hidden inset-y-12">
        <div *ngIf="titleText" class="absolute w-full inset-y-1/2 h-9 object-center text-center z-20 transform -translate-x-16 sm:-translate-x-24 -translate-y-12 sm:-translate-y-6">
          <span class="bg-gray-800 text-2xl text-orange font-bold p-8 border-4 border-orange rounded-md tracking-wide whitespace-nowrap">{{ titleText }}</span>
        </div>
        <div *ngIf="secondText" class="absolute w-full inset-y-1/2 h-8 object-center text-center z-20 animate-pulse transform translate-x-8 sm:translate-x-24 translate-y-7 sm:translate-y-6 -rotate-12">
          <span class="bg-gray-800 bg-opacity-25 backdrop-blur-xl text-2xl text-teal-lightest font-bold p-8 sm:rounded-0 border-4 border-teal-lightest tracking-wide whitespace-nowrap">{{ secondText }}</span>
        </div>
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
  @Input() secondText = '';

  codeText: string = '';
  index: number = 0;

  constructor(
    private httpClient: HttpClient,
    private windowService: WindowService,
  ) { }

  ngOnInit(): void {

    const randomFile = this._files[Math.floor(Math.random() * this._files.length)];

    const isSSR = this.windowService.isSSR();

    if (isSSR) {

      this.codeText = `
// It seem's that you've loaded my site with javascript disabled,
// that or I've managed to mess up my site's caching.
// Please consider supporting starving javascript developers maintaining obscure npm packages
// and surviving off the the scraps of npm installs by enabling javascript in your browser.




// Some people would say to you, "Browse without javascript for a safer experience." and I tell you those
// people are heretics!  These people don't understand the beauty of a sleek user experience, but since
// I do, I've prepared this text for your enjoyment so you don't lose the entire effect of my backdrop.
// I'll just assume you're a fellow gentleman who care's about the precious megabytes we waste shipping
// sleek frameworks.




// Oh! You scrolled down?  ¯\\_(ツ)_/¯
      `;
      this.index = this.codeText.length;
    } else {
      this.httpClient.get(randomFile, { responseType: 'text' }).subscribe(codeText => {
        this.codeText = codeText;
        this.startTypingTimer(this.codeText.length, 45, 15);
      });
    }

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

      this.windowService.setTimeout(timerCb, nextTimeoutDelay);
    };

    timerCb();

  }

}
