import React from 'react';
import './InformationCard.css';
import { ActiveCases } from './ActiveCases';
import { DailyTests } from './DailyTests';

export const ActiveAndTests = ({ active, confirmed, tests }) => {
	return (
		<div className="row mt-5">
			<ActiveCases activeCases={active} nonActiveCases={confirmed - active} active={active} />
			<DailyTests tests={tests} />
		</div>
	);
};
