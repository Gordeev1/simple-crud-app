import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import store from './store';
import routes from './routes';
import './styles.css';

injectTapEventPlugin();

window.store = store;

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('root')
);
