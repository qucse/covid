import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { QatarSituation } from './pages/QatarSituation';
import { WhatIf } from './pages/WhatIf';
import { GCCSituation } from './pages/GCCSituation';
import { Context as GCCContext } from './contexts/GCCContext';
import LoadingScreen from 'react-loading-screen';

function App() {
	const {
		state: { GCCData, country, scaleType, countryData, from, to },
		getGCCData,
		getCountryDailyData
	} = useContext(GCCContext);

	useEffect(() => {
		getGCCData();
	}, []);

	useEffect(
		() => {
			getCountryDailyData(country, scaleType, from, to);
		},
		[ country, scaleType, from, to ]
	);
	return GCCData && countryData ? (
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
	) : (
		<LoadingScreen
			loading={true}
			bgColor="#f2f4f5"
			spinnerColor="#9ea5f8"
			textColor="#676767"
			text="Loading Data ..."
		/>
	);
}

export default App;
