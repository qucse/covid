import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Context } from '../../contexts/GCCContext';
import TextField from '@material-ui/core/TextField';

export const GCCDailyDataForm = () => {
	const { state: { country, scaleType }, changeCountry, changeScaleType, changeFrom, changeTo } = useContext(Context);
	const countries = [
		{
			value: 'saudi-arabia',
			key: 'Saudi Arabia'
		},
		{
			value: 'qatar',
			key: 'Qatar'
		},

		{
			value: 'united-arab-emirates',
			key: 'United Arab Emirates'
		},
		{
			value: 'kuwait',
			key: 'Kuwait'
		},
		{
			value: 'oman',
			key: 'Oman'
		},
		{
			value: 'bahrain',
			key: 'Bahrain'
		}
	];
	const scaleTypes = [
		{
			value: 'daily',
			key: 'Daily'
		},
		{
			value: 'logarithmic',
			key: 'Logarithmic'
		},

		{
			value: 'linear',
			key: 'Linear'
		}
	];

	return (
		<React.Fragment>
			<div className="row mt-2" style={{ width: '100%' }}>
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
					<p style={{ marginRight: 20 }}>Graph:</p>
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
			<div className="row mt-3 mb-3" style={{ width: '100%' }}>
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>From:</p>
					<TextField
						type="date"
						style={{ width: '100%' }}
						onChange={(event) => {
							changeFrom(event.target.value);
						}}
					/>
				</div>
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>To:</p>
					<TextField
						style={{ width: '100%' }}
						type="date"
						onChange={(event) => {
							changeTo(event.target.value);
						}}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};
