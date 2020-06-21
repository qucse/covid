import React from 'react';
import { InformationCard } from './InformationCard';

export const GeneralData = ({ data }) => {
	return (
		<div className="mt-3">
			<p>Last Updated On: {data.date}</p>
			<div className="row">
				<div className="col-md-4">
					<InformationCard
						data={data.confirmed}
						newData={data.newConfirmed}
						title={'Confirmed Cases'}
						subtitle={'New Confirmed Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.recovered}
						newData={data.newRecovered}
						title={'Recovered Cases'}
						subtitle={'New Recovered Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.deaths}
						newData={data.newDeathCases}
						title={'Total Deaths'}
						subtitle={'New Deaths'}
					/>
				</div>
			</div>
			<div className="row mt-4">
				<div className="col-md-4">
					<InformationCard
						data={data.totalICUCases}
						newData={data.newICUCases}
						title={'Total ICU Cases'}
						subtitle={'New ICU Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.totalHospitalCases}
						newData={data.newHospitalCases}
						title={'Total Hospital Cases'}
						subtitle={'New Hospital Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.totalTests}
						newData={data.newTests}
						title={'Total Tests'}
						subtitle={'New Tests'}
					/>
				</div>
			</div>
		</div>
	);
};
