import React, { useEffect } from 'react';
import { GeneralData } from '../components/QatarSituation/GeneralData';
import { ActiveAndTests } from '../components/QatarSituation/ActiveAndTests';
import { DailyData } from '../components/QatarSituation/DailyData';

export const QatarSituation = () => {
	useEffect(() => {
		document.title = 'Qatar Situation';
	}, []);

	return (
		<div className="container">
			<GeneralData />
			<DailyData />
			<ActiveAndTests />
		</div>
	);
};
