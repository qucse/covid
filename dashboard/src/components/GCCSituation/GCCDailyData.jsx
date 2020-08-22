import React from 'react';
import { Line } from 'react-chartjs-2';
import { GCCDailyDataForm } from './GCCDailyDataForm';
import { Bar } from 'react-chartjs-2';

export const GCCDailyData = ({ data, scaleType }) => {
	const chartInfo = {
		labels: data[0],
		datasets: [
			{
				label: 'Confirmed',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(40, 158, 209,0.4)',
				borderColor: 'rgba(40, 158, 209,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(40, 158, 209,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(40, 158, 209,1)',
				pointHoverBorderColor: 'rgba(40, 158, 209,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: data[1]
			},
			{
				label: 'Recovered',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(64, 168, 50,0.4)',
				borderColor: 'rgba(64, 168, 50,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(64, 168, 50,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(64, 168, 50,1)',
				pointHoverBorderColor: 'rgba(64, 168, 50,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: data[3]
			},
			{
				label: 'Death',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(235, 5, 5,0.4)',
				borderColor: 'rgba(235, 5, 5,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(235, 5, 5,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(235, 5, 5,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: data[2]
			}
		]
	};
	const info = {
		labels: data[0],
		datasets: [
			{
				label: 'Recovered',
				backgroundColor: 'rgba(64, 168, 50)',
				borderColor: 'rgba(64, 168, 50,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(64, 168, 50,0.4)',
				hoverBorderColor: 'rgba(64, 168, 50,1)',
				data: data[3]
			},
			{
				label: 'Confirmed',
				backgroundColor: 'rgba(40, 158, 209)',
				borderColor: 'rgba(40, 158, 209,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(40, 158, 209,0.4)',
				hoverBorderColor: 'rgba(40, 158, 209,1)',
				data: data[1]
			},
			{
				label: 'Deaths',
				backgroundColor: 'rgba(235, 5, 5)',
				borderColor: 'rgba(235, 5, 5,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(235, 5, 5,0.4)',
				hoverBorderColor: 'rgba(235, 5, 5,1)',
				data: data[2]
			}
		]
	};
	return (
		<React.Fragment>
			<GCCDailyDataForm />
			{/* <Line
				data={chartInfo}
				options={{
					scales: {
						yAxes: [
							{
								type: scaleType === 'logarithmic' ? 'logarithmic' : 'linear'
							}
						]
					},
				}}
			/> */}
			<Bar
				data={info}
				options={{
					scales: {
						xAxes: [
							{
								stacked: true
							}
						],
						yAxes: [
							{
								stacked: true,
								type: scaleType === 'logarithmic' ? 'logarithmic' : 'linear'
							}
						]
					}
				}}
			/>
		</React.Fragment>
	);
};
