import React, { useContext } from 'react';
import { Bubble } from './Bubble';
import { Map } from './Map';
import { Context } from '../../contexts/GCCContext';
import { DatePicker } from '@material-ui/pickers';

export const MapAndBubble = () => {
	const { state, changeTo } = useContext(Context);
	let datee = state.originalDate.split('-');
	let last = `${datee[2]}/${datee[1]}/${datee[0]}`;
	return (
		<div className="">
			<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 5 }}>
				<p>Last Updated On: {`${last}`}</p>
				<div style={{ display: 'flex', alignItems: 'baseline' }}>
					<p style={{ marginRight: 10 }}>Get Data Until:</p>
					<DatePicker
						disableToolbar
						allowKeyboardControl
						format="dd/MM/yyyy"
						value={state.to}
						variant="inline"
						onChange={(date) => {
							let month =
								date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
							let ndate = date.getUTCDate() + 1 < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
							let year = date.getUTCFullYear();
							let newDate = `${year}-${month}-${ndate}`;
							if (new Date(newDate) > new Date(state.originalDate))
								alert(`Please Select Date before ${last}`);
							else if (new Date(newDate) < new Date('2020-01-04'))
								alert(`Please Select Date After 04/01/2020`);
							else changeTo(newDate);
						}}
						style={{ marginRight: 3 }}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-container" style={{ height: 500, width: '100%' }}>
							<Map data={state.GCCData} />
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="card">
						<div className="card-container" style={{ height: 500, width: '100%' }}>
							<Bubble data={state.GCCData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
