import React from 'react';
import { MapAndBubble } from '../components/GCCSituation/MapAndBubble';
import { Table } from '../components/GCCSituation/Table';
import { LineAndStack } from '../components/GCCSituation/LineAndStack';

export const GCCSituation = () => {
	return (
		<div className="container-fluid mt-3">
			<MapAndBubble />
			<LineAndStack />
			<Table />
		</div>
	);
};
