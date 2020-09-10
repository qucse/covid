import React, { useContext, useEffect } from 'react';
import './InformationCard.css';
import { Chart, Line } from 'react-chartjs-2';
import { Context } from '../../contexts/whatIfContext';
import moment from 'moment';
import lodash from 'lodash';

export const Graph = () => {
	const { state: { predictions: countryData } } = useContext(Context);
	let lastData = countryData[0][countryData[0].length - 1];
	let days = lastData.split('/');
	let currDate = moment.utc(new Date(days[2], --days[1], ++days[0])).startOf('day');
	let lastDate = moment
		.utc(new Date(new Date(days[2], days[1], days[0]).getTime() + 30 * 24 * 60 * 60 * 1000))
		.startOf('day');
	let dates = [];

	while (currDate.add(1, 'days').diff(lastDate) <= 0) {
		let date = currDate.clone().toDate().toISOString();
		date = date.substring(0, date.indexOf('T'));
		date = date.split('-');
		dates.push(`${date[2]}/${date[1]}/${date[0]}`);
	}

	// console.log(countryData[2]);
	let labels = lodash.concat(countryData[0], dates);
	const chartInfo = {
		labels,
		datasets: [
			{
				label: 'Actual',
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
				label: 'Prediction',
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
				data: countryData[2]
			}
		]
	};

	function addLine() {
		Chart.pluginService.register({
			afterDraw: function(chart, easing) {
				const ctx = chart.ctx;
				var index = chart.config.options.lineAtIndex;

				if (index) {
					var xAxis = chart.scales['x-axis-0'];
					var yAxis = chart.scales['y-axis-0'];

					var x1 = xAxis.getPixelForValue(index);
					var y1 = yAxis.top;

					var x2 = xAxis.getPixelForValue(index);
					var y2 = yAxis.bottom;

					ctx.save();
					ctx.setLineDash([ 10, 10 ]);
					ctx.beginPath();
					ctx.moveTo(x1, y1);
					ctx.lineWidth = 1;
					ctx.strokeStyle = '#000000';
					ctx.lineTo(x2, y2);
					ctx.stroke();
					ctx.restore();
					ctx.setLineDash([ 0 ]);
				}
			}
		});
	}

	useEffect(() => {
		addLine();
	}, []);

	return (
		<div className="card mb-4 pl-3 pr-3">
			<div className="card-container">
				<p className="title" style={{ fontSize: 30 }}>
					Actual Vs. Prediction
				</p>
				<Line
					data={chartInfo}
					options={{
						lineAtIndex: labels.indexOf(lastData)
					}}
				/>
			</div>
		</div>
	);
};
