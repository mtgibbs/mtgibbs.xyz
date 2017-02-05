import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {InfoCard} from './components/infocard';
import {NavBar} from './components/navbar';

import '../style/style.scss';

class App extends React.Component<any, undefined> {
    render() {
        return <NavBar />
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);