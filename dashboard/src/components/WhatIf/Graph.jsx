import React from 'react';
import { Line } from 'react-chartjs-2';

export const Graph = ({ data }) => {
	let predicted = [],
		dates = [],
		actual = [];

	data.forEach((element) => {
		dates.push(element.date);
		predicted.push(element.predicted);
		if (element.observed) actual.push(element.observed);
	});

	const info = {
		labels: dates,
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
				data: actual
			},
			{
				label: 'Predicted',
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
				data: predicted
			}
		]
	};

	return (
		<div className="card mt-3 mb-4  pl-3 pr-3 pb-3">
			<div className="card-container">
				<p className="title" style={{ marginBottom: 10, fontSize: 30 }}>
					What-If Analysis
				</p>
				<Line data={info} />
			</div>
		</div>
	);
};
