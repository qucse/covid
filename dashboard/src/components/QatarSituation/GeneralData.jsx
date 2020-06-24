import React from 'react';
import { InformationCard } from './InformationCard';
import confirmed from '../../assets/images/cough.svg';
import recovered from '../../assets/images/recovered.svg';
import icu from '../../assets/images/icu.png'
import hospital from '../../assets/images/hospital.svg'
import test from '../../assets/images/test.svg'
import dead from '../../assets/images/dead.png'


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
						subcolor={'rgba(171, 173, 176,0.25)'}
						color={'rgba(256, 256, 256)'}
						image={confirmed}
						subtitle={'New Confirmed Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.recovered}
						newData={data.newRecovered}
						title={'Recovered Cases'}
						color={'rgba(0, 240, 0,.1)'}
						subcolor={'rgba(0, 240, 0,.4)'}
						image={recovered}
						subtitle={'New Recovered Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.deaths}
						newData={data.newDeathCases}
						subcolor={'rgba(240, 0, 0,0.4)'}
						color={'rgba(240, 0, 0,0.1)'}
						image={dead}
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
						subcolor={'rgba(255,168,0,.4)'}
						color={'rgba(255,168,0,.2)'}
						title={'Total ICU Cases'}
						image={icu}
						subtitle={'New ICU Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.totalHospitalCases}
						newData={data.newHospitalCases}
						subcolor={'rgba(255,168,0,.4)'}
						color={'rgba(255,168,0,.2)'}
						title={'Total Hospital Cases'}
						image={hospital}
						subtitle={'New Hospital Cases'}
					/>
				</div>
				<div className="col-md-4">
					<InformationCard
						data={data.totalTests}
						subcolor={'rgba(255,168,0,.4)'}
						newData={data.newTests}
						color={'rgba(255,168,0,.2)'}
						title={'Total Tests'}
						image={test}
						subtitle={'New Tests'}
					/>
				</div>
			</div>
		</div>
	);
};
