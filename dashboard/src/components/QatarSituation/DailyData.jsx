import React, { useContext, useEffect } from 'react';
import './InformationCard.css';
import { Chart, Line } from 'react-chartjs-2';
import { Context } from '../../contexts/GCCContext';
import { GCCDailyDataForm } from '../GCCSituation/GCCDailyDataForm';
import moment from 'moment';
import lodash from 'lodash';

export const DailyData = () => {
	const { state: { countryData, scaleType, range } } = useContext(Context);
	let lastData = countryData[0][countryData[0].length - 1];
	let currDate = moment.utc(new Date(lastData)).startOf('day');
	let lastDate = moment.utc(new Date(new Date(lastData).getTime() + range * 24 * 60 * 60 * 1000)).startOf('day');
	let dates = [];

	while (currDate.add(1, 'days').diff(lastDate) <= 0) {
		let date = currDate.clone().toDate().toISOString();
		date = date.substring(0, date.indexOf('T'));
		date = date.split('-');
		dates.push(`${date[2]}/${date[1]}/${date[0]}`);
	}

	const chartInfo = {
		labels: lodash.concat(countryData[0], dates),
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
				data: countryData[1]
			},
			{
				label: 'Confirmed Prediction',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(2, 70, 125,0.4)',
				borderColor: 'rgba(2, 70, 125,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(2, 70, 125,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(2, 70, 125,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: countryData[5]
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
				data: countryData[3]
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
				data: countryData[2]
			}
		]
	};

	function addLine() {
		Chart.pluginService.register({
			afterDraw: function(chart, easing) {
				// if (chart.tooltip._active && chart.tooltip._active.length) {
				// 	const activePoint = chart.controller.tooltip._active[0];
				// 	console.log(activePoint);
				// 	const ctx = chart.ctx;
				// 	const x = activePoint.tooltipPosition().x;
				// 	const topY = chart.scales['y-axis-0'].top;
				// 	const bottomY = chart.scales['y-axis-0'].bottom;

				// 	ctx.save();
				// 	ctx.beginPath();
				// 	ctx.moveTo(x, topY);
				// 	ctx.lineTo(x, bottomY);
				// 	ctx.lineWidth = 2;
				// 	ctx.strokeStyle = '#e23fa9';
				// 	ctx.stroke();
				// 	ctx.restore();
				// }
				// console.log(chart);
			}
		});
		// Chart.Types.Line.extend();
	}

	useEffect(() => {
		// addLine();
	}, []);

	return (
		<div className="card mt-4 pl-3 pr-3 pb-3">
			<div className="card-container">
				<p className="title" style={{ marginBottom: 10, fontSize: 30 }}>
					Daily Data
				</p>
				<GCCDailyDataForm />
				<Line
					data={chartInfo}
					options={{
						scales: {
							yAxes: [
								{
									type: scaleType === 'logarithmic' ? 'logarithmic' : 'linear'
								}
							]
						}
					}}
				/>
			</div>
		</div>
	);
};
