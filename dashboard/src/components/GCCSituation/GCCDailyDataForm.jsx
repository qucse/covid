import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Context } from '../../contexts/GCCContext';

export const GCCDailyDataForm = () => {
	const { state: { scaleType, range }, changeScaleType, changeRange } = useContext(Context);
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
			value: 8,
			key: '+7 Days'
		},
		{
			value: 15,
			key: '+14 Days'
		},
		{
			value: 31,
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
						value={range}
						onChange={(event) => {
							changeRange(event.target.value);
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
