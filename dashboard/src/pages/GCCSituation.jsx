import React, { useEffect, useContext } from 'react';
import LoadingScreen from 'react-loading-screen';
import { MapAndBubble } from '../components/GCCSituation/MapAndBubble';
import { Table } from '../components/GCCSituation/Table';
import { LineAndStack } from '../components/GCCSituation/LineAndStack';
import { Context as GCCContext } from '../contexts/GCCContext';

export const GCCSituation = () => {
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
		<div className="container-fluid mt-3">
			<p>Last Updated On: {GCCData[0].date}</p>
			<MapAndBubble />
			<LineAndStack />
			<Table />
		</div>
	) : (
		<LoadingScreen
			loading={true}
			bgColor="#f2f4f5"
			spinnerColor="#9ea5f8"
			textColor="#676767"
			text="Loading Data ..."
		/>
	);
};
