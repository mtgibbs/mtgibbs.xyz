import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {InfoCard} from './components/infocard';

import '../style/style.scss';

ReactDOM.render(
    <InfoCard
        body="test"
        title="banana"
        uri="https://github.com/mtgibbs"
        iconClass="fa fa-code" />,
    document.getElementById('app')
);