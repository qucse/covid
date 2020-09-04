import React from 'react';
import { Radar as RadarChart } from 'react-chartjs-2';
import { GroupButton } from './GroupButton';
import _ from 'lodash';

export const Radar = ({ data, choice, onChange, name }) => {
	const COLORS = [
		{
			name: 'recovered',
			backgroundColor: 'rgba(64, 168, 50,0.2)',
			borderColor: 'rgba(64, 168, 50,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(64, 168, 50,0.4)',
			hoverBorderColor: 'rgba(64, 168, 50,1)'
		},
		{
			name: 'confirmed',
			backgroundColor: 'rgba(40, 158, 209,0.2)',
			borderColor: 'rgba(40, 158, 209,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(40, 158, 209,0.4)',
			hoverBorderColor: 'rgba(40, 158, 209,1)'
		},
		{
			name: 'deaths',
			backgroundColor: 'rgba(235, 5, 5,0.2)',
			borderColor: 'rgba(235, 5, 5,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(235, 5, 5,0.4)',
			hoverBorderColor: 'rgba(235, 5, 5,1)'
		}
	];

	const info = {
		labels: data.filter((element) => element.country !== 'Saudi Arabia').map((element) => element.country),
		datasets: [
			{
				label: _.capitalize(choice),
				backgroundColor: COLORS.find((color) => color.name === choice).backgroundColor,
				borderColor: COLORS.find((color) => color.name === choice).borderColor,
				borderWidth: 1,
				hoverBackgroundColor: COLORS.find((color) => color.name === choice).hoverBackgroundColor,
				hoverBorderColor: COLORS.find((color) => color.name === choice).hoverBorderColor,
				data: data.filter((element) => element.country !== 'Saudi Arabia').map((element) => element[choice])
			}
		]
	};
	return (
		<React.Fragment>
			<GroupButton choice={choice} onChange={onChange} name={name} className="mb-5" />
			<RadarChart data={info} />
		</React.Fragment>
	);
};