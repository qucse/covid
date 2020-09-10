import React from 'react';
import { Bar } from 'react-chartjs-2';

export const ColumnChart = ({ data }) => {
	const info = {
		labels: data.map((country) => country.country),
		datasets: [
			{
				label: 'Confirmed',
				backgroundColor: 'rgba(40, 158, 209)',
				borderColor: 'rgba(40, 158, 209,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(40, 158, 209,0.4)',
				hoverBorderColor: 'rgba(40, 158, 209,1)',
				data: data.map((element) => element.confirmed)
			},
			{
				label: 'Recovered',
				backgroundColor: 'rgba(64, 168, 50)',
				borderColor: 'rgba(64, 168, 50,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(64, 168, 50,0.4)',
				hoverBorderColor: 'rgba(64, 168, 50,1)',
				data: data.map((element) => element.recovered)
			},
			{
				label: 'Active',
				backgroundColor: 'rgba(201, 109, 8)',
				borderColor: 'rgba(201, 109, 8,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(201, 109, 8,0.4)',
				hoverBorderColor: 'rgba(201, 109, 8,1)',
				data: data.map((element) => element.active)
			},
			{
				label: 'Deaths',
				backgroundColor: 'rgba(235, 5, 5)',
				borderColor: 'rgba(235, 5, 5,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(235, 5, 5,0.4)',
				hoverBorderColor: 'rgba(235, 5, 5,1)',
				data: data.map((element) => element.deaths)
			}
		]
	};

	return (
		<React.Fragment>
			<p style={{ fontSize: 27, marginTop: 6, marginBottom: 8 }}>Cumulative Data</p>
			<Bar data={info} />
		</React.Fragment>
	);
};
