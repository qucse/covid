import React, { useContext } from 'react';
import { ColumnChart } from './ColumnChart';
import { GCCDailyData } from './GCCDailyData';
import { Context } from '../../contexts/GCCContext';
export const LineAndStack = () => {
	const { state: { GCCData, country, scaleType, countryData }, changeCountry } = useContext(Context);
	return (
		<div className="row">
			<div className="col-md-6">
				<ColumnChart data={GCCData} />
			</div>
			<div className="col-md-6">
				<GCCDailyData
					data={countryData}
					country={country}
					scaleType={scaleType}
					changeCountry={changeCountry}
				/>
			</div>
		</div>
	);
};
