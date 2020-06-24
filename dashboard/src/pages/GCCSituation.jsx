import React, { useEffect, useState } from 'react';
import gcc from '../API/GCC';
import LoadingScreen from 'react-loading-screen';
import { MapAndBubble } from '../components/GCCSituation/MapAndBubble';

export const GCCSituation = () => {
	const [ GCCData, setGCCData ] = useState(null);

	async function getGCCData() {
		let data = await gcc.getDataForAllGCC();
		setGCCData(data);
	}

	useEffect(() => {
		getGCCData();
	}, []);

	return GCCData ? (
		<div className="container">
			<MapAndBubble data={GCCData} />
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
