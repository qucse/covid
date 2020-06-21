import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export const ActiveCases = ({ activeCases, nonActiveCases, active }) => {

	const data = {
		labels: [ 'Active Cases', 'Non-Active Cases' ],
		datasets: [
			{
				data: [ activeCases, nonActiveCases ],
				backgroundColor: [ '#FF6384', '#36A2EB' ],
				hoverBackgroundColor: [ '#FF6384', '#36A2EB' ]
			}
		]
	};

	return (
		<div className="col-md-6 ">
			<div className="card pb-3">
				<div className="card-container">
					<p className="title" style={{ marginBottom: 10, fontSize: 30 }}>
						Active Vs. Non-Active
					</p>
					<Doughnut data={data} />
				</div>
			</div>
		</div>
	);
};
