import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { Provider as GCCProvider } from './contexts/GCCContext';
import { Provider as QatarProvider } from './contexts/QatarContext';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

ReactDOM.render(
	<React.StrictMode>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<QatarProvider>
				<GCCProvider>
					<App />
				</GCCProvider>
			</QatarProvider>
		</MuiPickersUtilsProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
