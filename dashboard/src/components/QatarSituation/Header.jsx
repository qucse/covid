import React, { useContext } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { Context } from '../../contexts/QatarContext';

export const Header = () => {
	const { state: { toDate, originalDate }, onDateChange } = useContext(Context);
	let datee = new Date(originalDate);
	let last = `${datee.getUTCDate()}/${datee.getUTCMonth() +
		1}/${datee.getFullYear()} ${datee.getHours()}:${datee.getMinutes()}:${datee.getSeconds()}`;
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'baseline',
				justifyContent: 'space-between',
				marginBottom: 5,
				flexWrap: 'wrap'
			}}
		>
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<p style={{ marginRight: 10 }}>Set Situation On:</p>
				<DatePicker
					defaultValue={last}
					format="dd/MM/yyyy"
					value={toDate}
					variant="inline"
					onChange={(date) => {
						let month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
						let ndate = date.getUTCDate();
						let year = date.getUTCFullYear();
						let newDate = `${year}-${month}-${ndate}`;
						if (new Date(newDate) > new Date(originalDate) || new Date(newDate) < new Date('2020-02-29'))
							alert(`Please select a date between 29/02/2020 and ${last}`);
						else onDateChange(newDate);
					}}
					style={{ marginRight: 3 }}
				/>
			</div>
			<p>Last Updated On: {last}</p>
		</div>
	);
};
