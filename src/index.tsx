import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InfoCard } from './components/infocard';
import { NavBar } from './components/navbar';
import { CodeHero } from './components/codehero';

// script
import 'jquery';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap'
import '../node_modules/typed.js/js/typed'

// styles
import '../node_modules/bootstrap/dist/css/bootstrap-theme'
import '../style/style.scss';

class App extends React.Component<any, undefined> {
    render() {
        return <div>
            <NavBar />
            <CodeHero />
        </div>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);