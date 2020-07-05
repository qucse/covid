import React from 'react';
import { Line } from 'react-chartjs-2';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export const GCCDailyData = ({ data, country, setCountry }) => {
	const info = {
		labels: data[0],
		datasets: [
			{
				label: 'Confirmed',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(40, 158, 209,0.4)',
				borderColor: 'rgba(40, 158, 209,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(40, 158, 209,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(40, 158, 209,1)',
				pointHoverBorderColor: 'rgba(40, 158, 209,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: data[1]
			},
			{
				label: 'Recovered',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(64, 168, 50,0.4)',
				borderColor: 'rgba(64, 168, 50,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(64, 168, 50,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(64, 168, 50,1)',
				pointHoverBorderColor: 'rgba(64, 168, 50,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: data[3]
			},
			{
				label: 'Death',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(235, 5, 5,0.4)',
				borderColor: 'rgba(235, 5, 5,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(235, 5, 5,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(235, 5, 5,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 2,
				pointHitRadius: 10,
				data: data[2]
			}
		]
	};
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
	return (
		<div className="card mt-5  pl-3 pr-3 pb-3">
			<div className="card-container">
				<Select
					labelId="demo-simple-select-placeholder-label-label"
					id="demo-simple-select-placeholder-label"
					value={country}
					onChange={(event) => {
						setCountry(event.target.value);
					}}
					style={{ marginBottom: 12, marginTop: 10, width: '100%' }}
				>
					{countries.map((element) => <MenuItem value={element.value}>{element.key}</MenuItem>)}
				</Select>
				<Line data={info} />
			</div>
		</div>
	);
};
