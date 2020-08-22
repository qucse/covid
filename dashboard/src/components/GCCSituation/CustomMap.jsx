import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import MapChart from './MapChart';

export const CustomMap = ({ data, choice }) => {
	const [ content, setContent ] = useState('');
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<MapChart setTooltipContent={setContent} data={data} choice={choice} />
			<ReactTooltip type="light">{content}</ReactTooltip>
		</div>
	);
};
