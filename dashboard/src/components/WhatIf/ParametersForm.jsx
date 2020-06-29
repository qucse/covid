import React from 'react';
import { ParameterSlider } from './ParameterSlider';

export const ParametersForm = () => {
	let schoolClosing = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 30,
			label: '1'
		},
		{
			value: 70,
			label: '2'
		},
		{
			value: 100,
			label: '3'
		}
	];

	let workspaceClosing = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 30,
			label: '1'
		},
		{
			value: 70,
			label: '2'
		},
		{
			value: 100,
			label: '3'
		}
	];

	let restrictionsOnGatherings = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 25,
			label: '1'
		},
		{
			value: 50,
			label: '2'
		},
		{
			value: 75,
			label: '3'
		},
		{
			value: 100,
			label: '4'
		}
	];

	let closePT = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 50,
			label: '1'
		},
		{
			value: 100,
			label: '2'
		}
	];

	let closeInternationalTravel = [
		{
			value: 0,
			label: '0'
		},
		{
			value: 25,
			label: '1'
		},
		{
			value: 50,
			label: '2'
		},
		{
			value: 75,
			label: '3'
		},
		{
			value: 100,
			label: '4'
		}
	];

	return (
		<div className=" mt-3">
			<div className="row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
						<ParameterSlider
							title={'School Closing'}
							marks={schoolClosing}
							tooltip={
								'0 - no measures 1 - recommend closing 2 - require closing (only some levels or categories, eg just high school, or just public schools) 3 - require closing all levels'
							}
						/>
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
						<ParameterSlider
							title={'Restrictions On Gatherings'}
							marks={restrictionsOnGatherings}
							tooltip={
								'0 - no restrictions 1 - restrictions on very large gatherings (the limit is above 1000 people) 2 - restrictions on gatherings between 101-1000 people 3 - restrictions on gatherings between 11-100 people 4 - restrictions on gatherings of 10 people or less'
							}
						/>
					</div>
				</div>
			</div>

			<div className="mt-3 row">
				<div className="col-md-12">
					<div className=" card pr-3 pl-3 ">
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
					<div className=" card pr-3 pl-3 ">
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
