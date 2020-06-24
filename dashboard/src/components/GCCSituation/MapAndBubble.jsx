import React from 'react';
import { Bubble } from './Bubble';
// import { CountriesMap } from './CountriesMap';

export const MapAndBubble = ({ data }) => {
	return (
		<div className=" mt-3">
			<p>Last Updated On: {data[0].date}</p>
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-container" style={{ height: 500, width: 550 }}>
							{/* <CountriesMap /> */}
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="card">
						<div className="card-container" style={{ height: 500, width: 550 }}>
							<Bubble data={data} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
