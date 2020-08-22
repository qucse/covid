import React, { useContext } from 'react';
import { InformationCard } from './InformationCard';
import confirmed from '../../assets/images/cough.svg';
import recovered from '../../assets/images/recovered.svg';
import icu from '../../assets/images/icu.png';
import hospital from '../../assets/images/hospital.svg';
import test from '../../assets/images/test.svg';
import dead from '../../assets/images/dead.png';
import { Context } from '../../contexts/QatarContext';
import { Header } from './Header';

export const GeneralData = () => {
	const { state: { latestInformation } } = useContext(Context);

	return (
		<div className="mt-3">
			<Header />
			<div className="row">
				<div className="col-md-4 mb-4">
					<InformationCard
						data={latestInformation.confirmed}
						newData={latestInformation.newConfirmed}
						title={'Confirmed Cases'}
						subcolor={'rgba(171, 173, 176,0.25)'}
						color={'rgba(256, 256, 256)'}
						image={confirmed}
						subtitle={'New Confirmed Cases'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={latestInformation.recovered}
						newData={latestInformation.newRecovered}
						title={'Recovered Cases'}
						color={'rgba(0, 240, 0,.1)'}
						subcolor={'rgba(0, 240, 0,.4)'}
						image={recovered}
						subtitle={'New Recovered Cases'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={latestInformation.deaths}
						newData={latestInformation.newDeathCases}
						subcolor={'rgba(240, 0, 0,0.4)'}
						color={'rgba(240, 0, 0,0.1)'}
						image={dead}
						title={'Total Deaths'}
						subtitle={'New Deaths'}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-md-4 mb-4">
					<InformationCard
						data={latestInformation.totalICUCases}
						newData={latestInformation.newICUCases}
						subcolor={'rgba(255,168,0,.4)'}
						color={'rgba(255,168,0,.2)'}
						title={'Total ICU Cases'}
						image={icu}
						subtitle={'New ICU Cases'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={latestInformation.totalHospitalCases}
						newData={latestInformation.newHospitalCases}
						subcolor={'rgba(255,168,0,.4)'}
						color={'rgba(255,168,0,.2)'}
						title={'Total Hospital Cases'}
						image={hospital}
						subtitle={'New Hospital Cases'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={latestInformation.totalTests}
						subcolor={'rgba(255,168,0,.4)'}
						newData={latestInformation.newTests}
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
