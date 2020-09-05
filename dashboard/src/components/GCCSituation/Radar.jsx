import React from 'react';
import { Polar as RadarChart } from 'react-chartjs-2';
import { GroupButton } from './GroupButton';
import _ from 'lodash';
import { scaleQuantile } from 'd3-scale';

export const Radar = ({ data, choice, onChange, name }) => {
	const COLOR_RANGE = [
			'rgb(253, 212, 158)',
			'rgb(253, 187, 132)',
			'rgb(252, 141, 89)',
			'rgb(239, 101, 72)',
			'rgb(215, 48, 31)',
			'rgb(179, 0, 0)',
			'rgb(127, 0, 0)'
		],
		range = data
			.filter((element) => element.country !== 'Saudi Arabia')
			.map((d) => d[choice])
			.sort((a, b) => a - b),
		colorScale = scaleQuantile().domain(range).range(COLOR_RANGE),
		COLORS = data
			.filter((element) => element.country !== 'Saudi Arabia')
			.map((element) => colorScale(element[choice]));
	const info = {
		labels: data.filter((element) => element.country !== 'Saudi Arabia').map((element) => element.country),
		datasets: [
			{
				label: _.capitalize(choice),
				backgroundColor: COLORS,
				borderColor: COLORS,
				borderWidth: 1,
				hoverBackgroundColor: COLORS,
				hoverBorderColor: COLORS,
				data: data.filter((element) => element.country !== 'Saudi Arabia').map((element) => element[choice])
			}
		]
	};
	return (
		<React.Fragment>
			<GroupButton choice={choice} onChange={onChange} name={name} className="mb-5" />
			<span className="mb-2" />
			<RadarChart data={info} />
		</React.Fragment>
	);
};
