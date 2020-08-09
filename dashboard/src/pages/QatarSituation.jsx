import React from 'react';
import { GeneralData } from '../components/QatarSituation/GeneralData';
import { ActiveAndTests } from '../components/QatarSituation/ActiveAndTests';
import { DailyData } from '../components/QatarSituation/DailyData';

export const QatarSituation = () => {
	return (
		<div className="container">
			<GeneralData />
			<DailyData />
			<ActiveAndTests />
		</div>
	);
};
