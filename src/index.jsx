/*
    Webpack entry file
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory} from 'react-router';
import App from './components/App.jsx';
import NotFound from "./components/NotFound.jsx";


ReactDOM.render(
    (
        <Router history={hashHistory}>

                <Route path="/" component={App}/>
                <Route path="*" component={NotFound}/>


        </Router>
    )
, document.getElementById('app'));