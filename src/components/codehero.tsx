import * as React from 'react';
import 'jquery';

export class CodeHero extends React.Component<any, undefined> {

    private _files = [
        'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-labelclasses/master/src/scripts/chartist-plugin-labelclasses.js',
        'https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/index.js',
        'https://raw.githubusercontent.com/mtgibbs/chartist-plugin-barlabels/master/src/scripts/chartist-plugin-barlabels.js',
        'https://raw.githubusercontent.com/mtgibbs/estudu/master/js/main.js',
        'https://raw.githubusercontent.com/mtgibbs/NapkinTour/master/napkin.tour.js',
        'https://raw.githubusercontent.com/mtgibbs/gulp-less-branding-js/master/test/main.js'
    ];

    render() {
        return <div className="container">
            <div className="jumbotron code-hero">
                <div className="row">
                    <div className="col-md-12 code-typing-container">
                        <code id="typingThing"></code>
                    </div>
                </div>

                <span className="hero-title">Hi.  I'm Matt.</span>
                <div className="hero-shadow-panel"></div>
            </div>
        </div>
    }

    componentDidMount() {
        $.get(this._files[Math.floor(Math.random() * this._files.length)]).done(response => {
            response = response.replace(/(\n)+/g, '   ');
        });
    }
}