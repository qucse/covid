import React from 'react';
import { ParameterSlider } from './ParameterSlider';

export const ParametersForm = () => {
	let schoolClosing = [
		{
			value: 0,
			label: 'No Measures'
		},
		{
			value: 30,
			label: 'Recommend Closing'
		},
		{
			value: 70,
			label: 'Require Closing'
		},
		{
			value: 100,
			label: 'Close All Levels'
		}
	];

	let workspaceClosing = [
		{
			value: 0,
			label: 'No Measures'
		},
		{
			value: 30,
			label: 'Recommend Closing'
		},
		{
			value: 70,
			label: 'Require Closing'
		},
		{
			value: 100,
			label: 'Close All Levels'
		}
	];

	let restrictionsOnGatherings = [
		{
			value: 0,
			label: 'No Measures'
		},
		{
			value: 25,
			label: '> 1000 people'
		},
		{
			value: 50,
			label: '101-1000 people'
		},
		{
			value: 75,
			label: '11-100 people'
		},
		{
			value: 100,
			label: '< 10 people'
		}
    ];
    
	let closePT = [
		{
			value: 0,
			label: 'No Measures'
		},
		{
			value: 50,
			label: 'Recommend Closing'
		},
		{
			value: 100,
			label: 'Require Closing'
		}
	];
	let closeInternationalTravel = [
		{
			value: 0,
			label: 'No Measures'
		},
		{
			value: 25,
			label: 'Screening Arrivals'
		},
		{
			value: 50,
			label: 'Quarantine Arrivals'
		},
		{
			value: 75,
			label: 'Ban arrivals from some regions'
		},
		{
			value: 100,
			label: 'Ban all regions'
		}
	];
	return (
		<div className=" mt-3">
			<div className="row">
				<div className="col-md-6">
					<div className=" card pr-5 pl-5 pb-1">
						<ParameterSlider
							title={'School Closing'}
							marks={schoolClosing}
							tooltip={
								'0 - no measures 1 - recommend closing 2 - require closing (only some levels or categories, eg just high school, or just public schools) 3 - require closing all levels'
							}
						/>
					</div>
				</div>
				<div className="col-md-6">
					<div className=" card pr-5 pl-5 pb-1">
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
				<div className="col-md-7">
					<div className=" card pr-5 pl-5 pb-1">
						<ParameterSlider
							title={'Restrictions On Gatherings'}
							marks={restrictionsOnGatherings}
							tooltip={
								'0 - no restrictions 1 - restrictions on very large gatherings (the limit is above 1000 people) 2 - restrictions on gatherings between 101-1000 people 3 - restrictions on gatherings between 11-100 people 4 - restrictions on gatherings of 10 people or less'
							}
						/>
					</div>
				</div>
				<div className="col-md-5">
					<div className=" card pr-5 pl-5 pb-1">
						<ParameterSlider
							title={'Close Public Transport'}
							marks={closePT}
							tooltip={
								'0 - no measures 1 - recommend closing (or significantly reduce volume/route/means of transport available) 2 - require closing (or prohibit most citizens from using it)'
							}
						/>
					</div>
				</div>
			</div>
			<div className="mt-3 row">
				<div className="col-md-12">
					<div className=" card pr-5 pl-5 pb-1">
						<ParameterSlider
							title={'International Travel Controls'}
							marks={closeInternationalTravel}
							tooltip={
								'0 - no restrictions 1 - screening arrivals 2 - quarantine arrivals from some or all regions 3 - ban arrivals from some regions 4 - ban on all regions or total border closure'
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
