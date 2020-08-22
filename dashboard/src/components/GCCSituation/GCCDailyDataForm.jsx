import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Context } from '../../contexts/GCCContext';

export const GCCDailyDataForm = () => {
	const {
		state: { country, scaleType },
		changeCountry,
		changeScaleType,

	} = useContext(Context);
	const countries = [
		{
			value: 'Qatar',
			key: 'Qatar'
		},
		{
			value: 'Saudi Arabia',
			key: 'Saudi Arabia'
		},

		{
			value: 'United Arab Emirates',
			key: 'United Arab Emirates'
		},
		{
			value: 'Kuwait',
			key: 'Kuwait'
		},
		{
			value: 'Oman',
			key: 'Oman'
		},
		{
			value: 'Bahrain',
			key: 'Bahrain'
		}
	];
	const scaleTypes = [
		{
			value: 'linear',
			key: 'Linear'
		},
		{
			value: 'daily',
			key: 'Daily'
		},
		{
			value: 'logarithmic',
			key: 'Logarithmic'
		}
	];
	return (
		<React.Fragment>
			<div className="row mt-2 mb-3" style={{ width: '100%' }}>
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>Country:</p>
					<Select
						value={country}
						onChange={(event) => {
							changeCountry(event.target.value);
						}}
						style={{ width: '100%' }}
					>
						{countries.map((element, index) => (
							<MenuItem key={index} value={element.value}>
								{element.key}
							</MenuItem>
						))}
					</Select>
				</div>
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>Axis:</p>
					<Select
						value={scaleType}
						onChange={(event) => {
							changeScaleType(event.target.value);
						}}
						style={{ width: '100%', padding: 0 }}
					>
						{scaleTypes.map((element, index) => (
							<MenuItem key={index} value={element.value}>
								{element.key}
							</MenuItem>
						))}
					</Select>
				</div>
			</div>
		</React.Fragment>
	);
};
