import React, { useContext } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { Context as GCCContext } from '../../contexts/GCCContext';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export const Header = () => {
	const { state: { to, originalDate, country }, changeTo, changeCountry } = useContext(GCCContext);

	let datee = new Date(originalDate);
	let last = `${datee.getUTCDate()}/${datee.getUTCMonth() + 1}/${datee.getFullYear()}`;
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
	return (
		<div
			className="row mt-3"
			style={{
				display: 'flex',
				alignItems: 'baseline',
				marginBottom: 5
			}}
		>
			<div className="col-md-4 mb-2" style={{ display: 'flex', alignItems: 'baseline' }}>
				<p style={{ marginRight: 10 }}>Country:</p>
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
			<div
				className="col-md-4 mb-2"
				style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}
			>
				<p style={{ marginRight: 0 }}>Situation On:</p>
				<DatePicker
					disableToolbar
					allowKeyboardControl
					defaultValue={last}
					format="dd/MM/yyyy"
					label="Select Date"
					value={to}
					onChange={(date) => {
						let month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
						let ndate = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
						let year = date.getUTCFullYear();
						let newDate = `${year}-${month}-${ndate}`;
						if (
							new Date(newDate) >= new Date(new Date(originalDate).getTime() - 1 * 24 * 60 * 60 * 1000) ||
							new Date(newDate) < new Date('2020-01-04')
						) {
							let date = new Date(
								new Date(originalDate).getTime() - 1 * 24 * 60 * 60 * 1000
							)
							let format = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`
							alert(
								`Please select a date between 04/01/2020 and ${format}`
							);
						} else {
							changeTo(newDate);
						}
					}}
					style={{ marginRight: 0, width: '70%' }}
				/>
			</div>
			<div
				className="col-md-4 mb-2"
				style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline' }}
			>
				<p className="m-0">Last Updated On: {last}</p>
			</div>
		</div>
	);
};
