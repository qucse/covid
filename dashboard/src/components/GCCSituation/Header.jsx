import React, { useContext } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { Context } from '../../contexts/GCCContext';

export const Header = (params) => {
	const { state: { to, originalDate }, changeTo } = useContext(Context);
	let datee = originalDate.split('-');
	let last = `${datee[2]}/${datee[1]}/${datee[0]}`;
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'baseline',
				justifyContent: 'space-between',
				flexWrap: 'wrap',
				marginBottom: 5
			}}
		>
			<div style={{ display: 'flex', alignItems: 'baseline' }}>
				<p style={{ marginRight: 10 }}>Situation On:</p>
				<DatePicker
					format="dd/MM/yyyy"
					label="Select Date"
					value={to}
					variant="inline"
					onChange={(date) => {
						let month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
						let ndate = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
						let year = date.getUTCFullYear();
						let newDate = `${year}-${month}-${ndate}`;
						if (new Date(newDate) > new Date(originalDate) || new Date(newDate) < new Date('2020-01-04'))
							alert(`Please select a date between 04/01/2020 and ${last}`);
						else changeTo(newDate);
					}}
					style={{ marginRight: 3 }}
				/>
			</div>
			<p>Last Updated On: {`${last}`}</p>
		</div>
	);
};
