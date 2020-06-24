import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { QatarSituation } from './pages/QatarSituation';
import { WhatIf } from './pages/WhatIf';
import { GCCSituation } from './pages/GCCSituation';

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<QatarSituation />
				</Route>
				<Route path="/gcc">
					<GCCSituation />
				</Route>
				<Route path="/prediction">
					<WhatIf />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
