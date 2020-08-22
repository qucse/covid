import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Context as QatarContext } from '../../contexts/QatarContext';
import { Context as whatIfContext } from '../../contexts/whatIfContext';
import moment from 'moment';

export const Graph = () => {
	const { state: { whatIfDaily } } = useContext(QatarContext);
	const { state: { predictions } } = useContext(whatIfContext);
	let dates = [];
	let currDate = moment.utc(new Date('5/1/2020')).startOf('day');
	let lastDate = moment.utc(new Date('1/2/2021')).startOf('day');

	while (currDate.add(1, 'days').diff(lastDate) <= 0) {
		let date = currDate.clone().toDate().toISOString();
		date = date.substring(0, date.indexOf('T'));
		date = date.split('-');
		dates.push(`${date[2]}/${date[1]}/${date[0]}`);
	}
	const info = {
		labels: dates.slice(0, whatIfDaily[1].slice(whatIfDaily[0].indexOf('1/5/2020')).length - 1 + 45),
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
				data: whatIfDaily[1].slice(whatIfDaily[0].indexOf('1/5/2020'))
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
				data: predictions.data.slice(
					0,
					whatIfDaily[1].slice(whatIfDaily[0].indexOf('1/5/2020')).length - 1 + 45
				)
			}
		]
	};

	return (
		<div className="card mb-4 pl-3 pr-3">
			<div className="card-container">
				<p className="title" style={{ fontSize: 30 }}>
					Actual Vs. Predicted
				</p>
				<Line data={info} />
			</div>
		</div>
	);
};
