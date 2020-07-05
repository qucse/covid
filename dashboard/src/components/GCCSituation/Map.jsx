import React from 'react';

// import { CountriesMap } from './CountriesMap';

export const Map = ({ data }) => {
	return (
		<div className=" mt-3">
			<p>Last Updated On: {data[0].date}</p>
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-container" style={{ height: 400, width: 550 }}>
							{/* <CountriesMap /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
