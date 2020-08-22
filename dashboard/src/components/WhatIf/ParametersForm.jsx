import React, { useContext } from 'react';
import { ParameterSlider } from './ParameterSlider';
import { Context } from '../../contexts/whatIfContext';
export const ParametersForm = () => {
	const {
		state: {
			schoolClosing,
			workspaceClosing,
			restrictionsOnGatherings,
			internationalTravelControls,
			closePublicTransport
		},
		changeSchoolClosing,
		changeWorkspaceClosing,
		changeClosePublicTransport,
		changeInternationalTravelControls,
		changeRestrictionsOnGatherings
	} = useContext(Context);

	let school = [
		{
			value: 0,
			label: 'No Measures',
			tooltip: 'No measures is applied'
		},
		{
			value: 1,
			label: 'Recommend Closing',
			tooltip: 'Close some levels'
		},
		{
			value: 2,
			label: 'Require Closing',
			tooltip: 'Only some levels or categories, (eg. just high school, or just public schools)'
		},
		{
			value: 3,
			label: 'Close All Levels'
		}
	];

	let workspace = [
		{
			value: 0,
			label: 'No Measures',
			tooltip: 'No measures is applied'
		},
		{
			value: 1,
			label: 'Recommend Closing',
			tooltip: 'Recommend closing (or recommend work from home)'
		},
		{
			value: 2,
			label: 'Require Closing',
			tooltip: 'Require closing (or work from home) for some sectors or categories of workers'
		},
		{
			value: 3,
			label: 'Close All Levels',
			tooltip: 'All-but-essential workplaces (eg. grocery stores, doctors)'
		}
	];

	let gatherings = [
		{
			value: 0,
			label: 'No Measures',
			tooltip: 'No measures is applied'
		},
		{
			value: 1,
			label: '> 1000',
			tooltip: 'restrictions on very large gatherings (the limit is above 1000 people)'
		},
		{
			value: 2,
			label: '101-1000',
			tooltip: 'Restrictions on gatherings between 101-1000 people'
		},
		{
			value: 3,
			label: '11-100',
			tooltip: 'Restrictions on gatherings between 11-100 people'
		},
		{
			value: 4,
			label: '< 10',
			tooltip: 'Restrictions on gatherings of 10 people or less'
		}
	];

	let PT = [
		{
			value: 0,
			label: 'No Measures',
			tooltip: 'No measures is applied'
		},
		{
			value: 1,
			label: 'Recommend Closing',
			tooltip: 'Recommend closing (or significantly reduce volume/route/means of transport available)'
		},
		{
			value: 2,
			label: 'Require Closing',
			tooltip: 'Require closing (or prohibit most citizens from using it)'
		}
	];
	let internationalTravel = [
		{
			value: 0,
			label: 'No Measures',
			tooltip: 'No measures is applied'
		},
		{
			value: 1,
			label: 'Screening',
			tooltip: 'Screen Check'
		},
		{
			value: 2,
			label: 'Quarantine',
			tooltip: 'Quarantine arrivals from some or all regions'
		},
		{
			value: 3,
			label: 'Ban some regions',
			tooltip: 'Ban arrivals from some regions'
		},
		{
			value: 4,
			label: 'Ban all regions',
			tooltip: 'Ban on all regions or total border closure'
		}
	];

	return (
		<React.Fragment>
			<div className="row mt-3 mt-sm-4">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'School Closing'}
							marks={school}
							object={schoolClosing}
							onChange={changeSchoolClosing}
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 row mt-sm-4">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'Workspace Closing'}
							marks={workspace}
							object={workspaceClosing}
							onChange={changeWorkspaceClosing}
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 row mt-sm-4">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'Restrictions On Gatherings'}
							onChange={changeRestrictionsOnGatherings}
							object={restrictionsOnGatherings}
							marks={gatherings}
						/>
					</div>
				</div>
			</div>

			<div className="mt-3 row mt-sm-4">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'Close Public Transport'}
							marks={PT}
							onChange={changeClosePublicTransport}
							object={closePublicTransport}
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 row mt-sm-4">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'Travel Controls'}
							onChange={changeInternationalTravelControls}
							marks={internationalTravel}
							object={internationalTravelControls}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
