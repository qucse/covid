import React from 'react';
import { ColumnChart } from './ColumnChart';
import { GCCDailyData } from './GCCDailyData';

export const LineAndStack = ({ lineData, StackData, country, setCountry }) => {
	return (
		<div className="row">
			<div className="col-md-6">
				<ColumnChart data={StackData} />
			</div>
			<div className="col-md-6">
				<GCCDailyData data={lineData} country={country} setCountry={setCountry} />
			</div>
		</div>
	);
};
