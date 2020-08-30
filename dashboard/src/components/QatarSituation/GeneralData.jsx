import React, { useContext } from 'react';
import { InformationCard } from './InformationCard';
import confirmed from '../../assets/images/cough.svg';
import recovered from '../../assets/images/recovered.svg';
import icu from '../../assets/images/icu.png';
import hospital from '../../assets/images/hospital.svg';
import test from '../../assets/images/test.svg';
import dead from '../../assets/images/dead.png';
import { Context } from '../../contexts/GCCContext';

export const GeneralData = () => {
	const { state: { GCCData, country } } = useContext(Context);

	return (
		<div>
			<div className="row">
				<div className="col-md-4 mb-4">
					<InformationCard
						data={GCCData.find((element) => element.country === country).confirmed}
						newData={GCCData.find((element) => element.country === country).newConfirmed}
						title={'Confirmed Cases'}
						subcolor={'rgba(171, 173, 176,0.25)'}
						color={'rgba(256, 256, 256)'}
						image={confirmed}
						subtitle={'New Confirmed Cases'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={GCCData.find((element) => element.country === country).recovered}
						newData={GCCData.find((element) => element.country === country).newRecovered}
						title={'Recovered Cases'}
						color={'rgba(0, 240, 0,.1)'}
						subcolor={'rgba(0, 240, 0,.4)'}
						image={recovered}
						subtitle={'New Recovered Cases'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={GCCData.find((element) => element.country === country).deaths}
						newData={GCCData.find((element) => element.country === country).newDeaths}
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
						data={GCCData.find((element) => element.country === country).mortality}
						newData={GCCData.find((element) => element.country === country).newMortality}
						subcolor={'rgba(255,168,0,.4)'}
						color={'rgba(255,168,0,.2)'}
						title={'Mortality Rate'}
						image={icu}
						percent={true}
						subtitle={'Mortality Rate Change'}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={GCCData.find((element) => element.country === country).stringency}
						newData={GCCData.find((element) => element.country === country).newStringency}
						subcolor={'rgba(255,168,0,.4)'}
						color={'rgba(255,168,0,.2)'}
						title={'Strictness Index'}
						image={hospital}
						subtitle={'Strictness Index Change'}
						percent={true}
					/>
				</div>
				<div className="col-md-4 mb-4">
					<InformationCard
						data={GCCData.find((element) => element.country === country).tests}
						subcolor={'rgba(255,168,0,.4)'}
						newData={GCCData.find((element) => element.country === country).newTests}
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
