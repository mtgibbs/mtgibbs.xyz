import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InfoCard } from './components/infocard';
import { NavBar } from './components/navbar';
import { CodeHero } from './components/codehero';

// script
import 'jquery';
import 'bootstrap';
import '../node_modules/typed.js/js/typed'

// styles
import '../node_modules/bootstrap/dist/css/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap-theme'
import '../style/style.scss';

class App extends React.Component<any, undefined> {
    render() {
        return <div>
            <NavBar />
            <CodeHero />
            <div className="container">
                <div className="info-cells">
                    <InfoCard iconClass="fa fa-code" uri="https://github.com/mtgibbs" title="Developer">
                        <p>
                            Actually more of just a problem solver.  I am a full stack developer
                            currently working primarily in C#, Typescript, and javascript on
                            Hewlett-Packard Enterprise's <a href="https://hpfod.com"> Fortify on Demand</a> product.
                            My interests lie in web technologies, user experience, and most
                            recently the "Internet of Things."  I've worked in several
                            industries, from insurance to software security, and in several
                            problem domains like high volume transaction processing systems
                            and web interfaces.
                        </p>
                    </InfoCard>
                    <InfoCard iconClass="fa fa-gamepad" uri="http://www.twitch.tv/pwnysenpai/profile" title="Game Enthusiast">
                        <p>
                            Games are what developed my passion for software.  They often
                            provide scenarios that let the user dissect patterns, iterate on
                            solutions, and feel the rush of accomplishment when they have
                            finally executed or arrived at the solution.  All within a framework
                            of defined rulesets and a tight feedback loop.  So it's not really
                            a surprise that someone with an interest in software would also
                            have an interest in games.
                        </p>
                    </InfoCard>
                    <InfoCard iconClass="fa fa-rss" uri="http://blog.mtgibbs.xyz" title="Blog">
                        <p>
                            <a href="http://blog.mtgibbs.xyz">Here</a> is the lack of a
                            collection of thoughts that I made because I was interested in
                            seeing how Jekyll worked.  It exists solely for practice with
                            something new and potentially for making ideas concrete by putting
                            them into words.
                        </p>
                    </InfoCard>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
