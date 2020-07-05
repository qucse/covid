import React, { useEffect, useState } from 'react';
import qatarAPI from '../API/Qatar';
import { GeneralData } from '../components/QatarSituation/GeneralData';
import { ActiveAndTests } from '../components/QatarSituation/ActiveAndTests';
import { DailyData } from '../components/QatarSituation/DailyData';
import LoadingScreen from 'react-loading-screen';

export const QatarSituation = () => {
	const [ latestInformation, setLatestInformation ] = useState(null);
	const [ dailyData, setDailyData ] = useState(null);
	const [ dailyTests, setDailyTests ] = useState(null);

	async function getLatestData() {
		let data = await qatarAPI.getLatestQatarData();
		setLatestInformation(data);
	}

	async function getDailyData() {
		let data = await qatarAPI.getQatarDailyData();
		setDailyData(data);
	}

	async function getDailyTests() {
		let data = await qatarAPI.getQatarDailyTestsData();
		setDailyTests(data);
	}

	useEffect(() => {
		getLatestData();
		getDailyData();
		getDailyTests();
	}, []);

	return latestInformation && dailyData && dailyTests ? (
		<div className="container-fluid">
			<GeneralData data={latestInformation} />
			<DailyData data={dailyData} />
			<ActiveAndTests
				active={latestInformation.totalActiveCases}
				deaths={latestInformation.deaths}
				recovered={latestInformation.recovered}
				tests={dailyTests}
			/>
		</div>
	) : (
		<LoadingScreen
			loading={true}
			bgColor="#f2f4f5"
			spinnerColor="#9ee5f8"
			textColor="#676767"
			text="Loading Data ..."
		/>
	);
};
