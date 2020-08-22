import React from 'react';
import { Pie } from 'react-chartjs-2';

export const ActiveCases = ({ active, deaths, recovered }) => {
	const data = {
		labels: [ 'Active', 'Recovered', 'Death' ],
		datasets: [
			{
				data: [ active, recovered, deaths ],
				backgroundColor: [ 'rgba(40, 158, 209,1)', 'rgba(64, 168, 50,1)', 'rgba(235, 5, 5,1)' ],
				hoverBackgroundColor: [ 'rgba(40, 158, 209,1)', 'rgba(64, 168, 50,1)', 'rgba(235, 5, 5,1)' ]
			}
		]
	};

	return (
		<div className="col-md-6 mb-sm-4">
			<div className="card pb-3">
				<div className="card-container">
					<p className="title" style={{ marginBottom: 10, fontSize: 30 }}>
						Active Vs. Non-Active
					</p>
					<Pie data={data} />
				</div>
			</div>
		</div>
	);
};
