import React, { useContext, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Context } from '../../contexts/GCCContext';

export const GCCDailyDataForm = () => {
	const {
		state: { scaleType },

		changeScaleType
	} = useContext(Context);
	const [ prediction, setPrediction ] = useState(7);
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

	const predictionRanges = [
		{
			value: 7,
			key: '+7 Days'
		},
		{
			value: 14,
			key: '+14 Days'
		},
		{
			value: 30,
			key: '+30 Days'
		}
	];
	return (
		<React.Fragment>
			<div className="row mt-2 mb-3" style={{ width: '100%' }}>
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
				<div className="col-md-6" style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 20 }}>Prediction Range:</p>
					<Select
						value={prediction}
						onChange={(event) => {
							setPrediction(event.target.value);
						}}
						style={{ width: '70%', padding: 0 }}
					>
						{predictionRanges.map((element, index) => (
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
