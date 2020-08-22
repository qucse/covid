import React from 'react';
import { Line } from 'react-chartjs-2';

export const DailyTests = ({ tests }) => {
	const info = {
		labels: tests[0],
		datasets: [
			{
				label: 'Daily Tests',
				fill: true,
				lineTension: 0.1,
				backgroundColor: 'rgba(201, 109, 8,0.4)',
				borderColor: 'rgba(201, 109, 8,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(201, 109, 8,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(201, 109, 8,1)',
				pointHoverBorderColor: 'rgba(201, 109, 8,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: tests[1]
			}
		]
	};

	return (
		<div className="col-md-6 mb-sm-4">
			<div className="card pb-3">
				<div className="card-container">
					<p className="title" style={{ marginBottom: 10, fontSize: 30 }}>
						Daily Tests
					</p>
					<Line data={info} />
				</div>
			</div>
		</div>
	);
};
