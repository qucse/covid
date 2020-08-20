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
			value: 'qatar',
			key: 'Qatar'
		},
		{
			value: 'saudi-arabia',
			key: 'Saudi Arabia'
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
			{/* <div className="row mt-3 mb-3" style={{ width: '100%' }}>
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>From:</p>
					<DatePicker
						disableToolbar
						allowKeyboardControl
						variant="inline"
						format="dd/MM/yyyy"
						style={{ width: '100%' }}
						value={from}
						onChange={(date) => {
							let month =
								date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
							let ndate =
								date.getUTCDate() + 1 < 10 ? `0${date.getUTCDate() + 1}` : date.getUTCDate() + 1;
							let year = date.getUTCFullYear();
							let newDate = `${year}-${month}-${ndate}`;
							console.log(newDate);
							changeFrom(newDate);
						}}
					/>
				</div>
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>To:</p>
					<DatePicker
						disableToolbar
						allowKeyboardControl
						variant="inline"
						format="dd/MM/yyyy"
						style={{ width: '100%' }}
						value={to}
						onChange={(date) => {
							let month =
								date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
							let ndate =
								date.getUTCDate() + 1 < 10 ? `0${date.getUTCDate() + 1}` : date.getUTCDate() + 1;
							let year = date.getUTCFullYear();
							let newDate = `${year}-${month}-${ndate}`;
							console.log(newDate);
							changeTo(newDate);
						}}
					/>
				</div> 
			</div>*/}
		</React.Fragment>
	);
};
