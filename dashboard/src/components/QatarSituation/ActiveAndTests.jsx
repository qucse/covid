import React from 'react';
import './InformationCard.css';
import { ActiveCases } from './ActiveCases';
import { DailyTests } from './DailyTests';

export const ActiveAndTests = ({ active, deaths, recovered, tests }) => {
	return (
		<div className="row mt-5 mb-5">
			<ActiveCases active={active} deaths={deaths} recovered={recovered} />
			<DailyTests tests={tests} />
		</div>
	);
};
