import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import Routes from './Routes';
import Head from './components/Head.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
	<BrowserRouter>
		<Head/>
		<Routes/>
	</BrowserRouter>
	), document.getElementById('root'));

serviceWorker.unregister();