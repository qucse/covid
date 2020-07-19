import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider as GCCProvider } from './contexts/GCCContext';
ReactDOM.render(
	<React.StrictMode>
		<GCCProvider>
			<App />
		</GCCProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
