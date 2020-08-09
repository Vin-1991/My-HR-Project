import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import BusyIndicator from '../components/utils/busyIndicator';

ReactDOM.render(
    <React.Fragment>
        <App />
        <BusyIndicator />
    </React.Fragment>, document.getElementById("content"));