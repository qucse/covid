import React, { useEffect, useContext } from 'react';
import { GeneralData } from '../components/QatarSituation/GeneralData';
import { ActiveAndTests } from '../components/QatarSituation/ActiveAndTests';
import { DailyData } from '../components/QatarSituation/DailyData';
import { Header } from '../components/QatarSituation/Header';
import { Context as GCCContext } from '../contexts/GCCContext';

export const QatarSituation = () => {
	const { state: { country } } = useContext(GCCContext);

	useEffect(
		() => {
			document.title = `${country} Situation`;
		},
		[ country ]
	);
	return (
		<div className="container">
			<Header />
			<GeneralData />
			<DailyData />
			<ActiveAndTests />
		</div>
	);
};
