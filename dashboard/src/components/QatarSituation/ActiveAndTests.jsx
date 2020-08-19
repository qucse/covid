import React, { useContext } from 'react';
import './InformationCard.css';
import { ActiveCases } from './ActiveCases';
import { DailyTests } from './DailyTests';
import { Context } from '../../contexts/QatarContext';

export const ActiveAndTests = () => {
	const { state: { latestInformation, dailyTests } } = useContext(Context);

	return (
			<div className="row mt-5 mb-5">
				<ActiveCases
					active={latestInformation.totalActiveCases}
					deaths={latestInformation.deaths}
					recovered={latestInformation.recovered}
				/>
				<DailyTests tests={dailyTests} />
			</div>
	);
};
