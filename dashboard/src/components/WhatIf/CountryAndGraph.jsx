import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Context } from '../../contexts/whatIfContext';

export const CountryAndGraph = () => {
	const { state: { policy }, changePolicy } = useContext(Context);
	let predefinedPolicies = [
		{
			key: 'Level 1',
			value: 1
		},
		{
			key: 'Level 2',
			value: 2
		},
		{
			key: 'Level 3',
			value: 3
		},
		{
			key: 'Level 4',
			value: 4
		},
		{
			key: 'Level 5',
			value: 5
		}
	];
	return (
		<div className="mt-4">
			<div className="row">
				<div className=" col-md-4 mb-4">
					<div className="card p-3" style={{ height: 118 }}>
						<p style={{ fontSize: 20 }}>Predefined Policies</p>
						<Select
							defaultValue={' '}
							value={policy}
							onChange={(event) => {
								changePolicy(event.target.value);
							}}
							style={{ width: '100%', padding: 0 }}
						>
							{predefinedPolicies.map((element, index) => (
								<MenuItem key={index} value={element.value}>
									{element.key}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>
				<div className=" col-md-4 mb-4">
					<div className="card p-3" style={{ height: 118 }}>
						<p style={{ fontSize: 20 }}>Country</p>
						<Select
							labelId="demo-simple-select-placeholder-label-label"
							id="demo-simple-select-placeholder-label"
							displayEmpty
							defaultValue={10}
						>
							<MenuItem value={10}>Qatar</MenuItem>
							{/* <MenuItem value={20}>Bahrain</MenuItem>
							<MenuItem value={30}>Kuwait</MenuItem>
							<MenuItem value={40}>Saudi Arabia</MenuItem>
							<MenuItem value={50}>Oman</MenuItem>
							<MenuItem value={60}>United Arab Emirates</MenuItem> */}
						</Select>
					</div>
				</div>
				<div className=" col-md-4 mb-4">
					<div className="card p-3" style={{ height: 118 }}>
						<p style={{ fontSize: 20 }}>Metric</p>
						<Select
							labelId="demo-simple-select-placeholder-label-label"
							id="demo-simple-select-placeholder-label"
							displayEmpty
							defaultValue={10}
						>
							<MenuItem value={10}>Confirmed</MenuItem>
							{/* <MenuItem value={20}>Recovered</MenuItem>
							<MenuItem value={30}>Deaths</MenuItem> */}
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};
