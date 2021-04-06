import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mtg-code-hero',
  template: `
    <div class="container mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <mtg-code-hero-text [codeText]="text" [characterPointerLocation]="index"></mtg-code-hero-text>
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

  text: string = '';
  index: number = 0;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    const randomFile = this._files[Math.floor(Math.random() * this._files.length)];
    this.httpClient.get(randomFile, { responseType: 'text' }).subscribe(codeText => {
      this.text = codeText;
      this.startTypingTimer(this.text.length, 75, 15);
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
