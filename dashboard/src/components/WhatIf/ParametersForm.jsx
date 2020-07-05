import React from 'react';
import { ParameterSlider } from './ParameterSlider';

export const ParametersForm = () => {
	let schoolClosing = [
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

	let workspaceClosing = [
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

	let restrictionsOnGatherings = [
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

	let closePT = [
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
	let closeInternationalTravel = [
		{
			value: 0,
			label: 'No Measures',
			tooltip: 'No measures is applied'
		},
		{
			value: 1,
			label: 'Screen Check'
		},
		{
			value: 2,
			label: 'Quarantine Arrivals',
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
		<div className="mt-3">
			<div className="row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider title={'School Closing'} marks={schoolClosing} />
					</div>
				</div>
			</div>
			<div className="mt-3 row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'Workspace Closing'}
							marks={workspaceClosing}
							tooltip={
								'0 - no measures 1 - recommend closing (or recommend work from home) 2 - require closing (or work from home) for some sectors or categories of workers 3 - require closing (or work from home) for all-but-essential workplaces (eg grocery stores, doctors)'
							}
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider title={'Restrictions On Gatherings'} marks={restrictionsOnGatherings} />
					</div>
				</div>
			</div>

			<div className="mt-3 row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider title={'Close Public Transport'} marks={closePT} />
					</div>
				</div>
			</div>
			<div className="mt-3 row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider title={'International Travel Controls'} marks={closeInternationalTravel} />
					</div>
				</div>
			</div>
		</div>
	);
};
