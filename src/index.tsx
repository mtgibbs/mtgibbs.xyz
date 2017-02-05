import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Hello} from './components/hello';

import '../style/style.scss';

ReactDOM.render(
    <Hello compiler="Typescript" framework="React" />,
    document.getElementById('example')
);