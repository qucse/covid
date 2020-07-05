import React, { useEffect, useState } from 'react';
import gcc from '../API/GCC';
import LoadingScreen from 'react-loading-screen';
import { Map } from '../components/GCCSituation/Map';
import { Table } from '../components/GCCSituation/Table';
import { LineAndStack } from '../components/GCCSituation/LineAndStack';

export const GCCSituation = () => {
	const [ GCCData, setGCCData ] = useState(null);
	const [ countryData, setCountryData ] = useState(null);
	const [ country, setCountry ] = useState('saudi-arabia');

	async function getGCCData() {
		let data = await gcc.getDataForAllGCC();
		console.log(data);
		setGCCData(data);
	}

	async function getCountryDailyDate(country) {
		let data = await gcc.getDailyForCountry(country);
		console.log(data);
		setCountryData(data);
	}

	useEffect(() => {
		getGCCData();
	}, []);

	useEffect(
		() => {
			getCountryDailyDate(country);
		},
		[ country ]
	);

	return GCCData && countryData ? (
		<div className="container-fluid">
			<Map data={GCCData} />
			<LineAndStack StackData={GCCData} lineData={countryData} country={country} setCountry={setCountry} />
			<Table data={GCCData} />
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
