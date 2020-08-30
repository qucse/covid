import React, { useContext } from 'react';
import './InformationCard.css';
import { ActiveCases } from './ActiveCases';
import { DailyTests } from './DailyTests';
import { Context as GCCContext } from '../../contexts/GCCContext';

export const ActiveAndTests = () => {
	const { state: { GCCData, country, countryData } } = useContext(GCCContext);

	return (
		<div className="row mt-5 mb-2">
			<ActiveCases
				active={GCCData.find((element) => element.country === country).active}
				deaths={GCCData.find((element) => element.country === country).deaths}
				recovered={GCCData.find((element) => element.country === country).recovered}
			/>
			<DailyTests tests={countryData} />
		</div>
	);
};
