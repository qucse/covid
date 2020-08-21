import React, { useEffect } from 'react';
import { MapAndBubble } from '../components/GCCSituation/MapAndBubble';
import { Table } from '../components/GCCSituation/Table';
import { LineAndStack } from '../components/GCCSituation/LineAndStack';
import { Header } from '../components/GCCSituation/Header';

export const GCCSituation = () => {
	useEffect(() => {
		document.title = 'GCC Situation';
	}, []);
	return (
		<div className="container-fluid  mt-3">
			<Header />
			<MapAndBubble />
			<LineAndStack />
			<Table />
		</div>
	);
};
