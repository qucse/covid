import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { QatarSituation } from './pages/QatarSituation';
import { WhatIf } from './pages/WhatIf';
import { GCCSituation } from './pages/GCCSituation';
import { Context as GCCContext } from './contexts/GCCContext';
import { Context as QatarContext } from './contexts/QatarContext';
import { Context as whatIfContext } from './contexts/whatIfContext';
import LoadingScreen from 'react-loading-screen';
import LoadingOverlay from 'react-loading-overlay';

function App() {
	const {
		state: {
			whatIfChange,
			predictions,
			schoolClosing,
			workspaceClosing,
			restrictionsOnGatherings,
			closePublicTransport,
			internationalTravelControls
		},
		getPrediction
	} = useContext(whatIfContext);

	const {
		state: { GCCData, country, scaleType, countryData, from, to, gccChange },
		getGCCData,
		getCountryDailyData
	} = useContext(GCCContext);

	const {
		state: { latestInformation, dailyData, dailyTests, toDate },
		getLatestQatarData,
		getQatarDailyData,
		getQatarDailyTestsData
	} = useContext(QatarContext);

	useEffect(
		() => {
			getCountryDailyData(country, scaleType, from, to);
			getGCCData(to);
		},
		[ country, scaleType, from, to ]
	);
	useEffect(() => {
		getQatarDailyData();
		getQatarDailyTestsData();
	}, []);

	useEffect(
		() => {
			getLatestQatarData(toDate);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ toDate ]
	);

	useEffect(
		() => {
			getPrediction({
				schoolClosing,
				workspaceClosing,
				restrictionsOnGatherings,
				closePublicTransport,
				internationalTravelControls
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			/*schoolClosing, workspaceClosing, restrictionsOnGatherings, closePublicTransport, internationalTravelControls*/
		]
	);

	useEffect(
		() => {
			getCountryDailyData(country, scaleType, from, to);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ country, scaleType, from, to ]
	);
	return GCCData && countryData && latestInformation && dailyData && dailyTests && predictions ? (
		<LoadingOverlay active={whatIfChange || gccChange} spinner text="Loading Your Customized Data...">
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
		</LoadingOverlay>
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
