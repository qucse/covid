import React, { useContext } from 'react';
import { ColumnChart } from './ColumnChart';
import { GCCDailyData } from './GCCDailyData';
import { Context } from '../../contexts/GCCContext';
export const LineAndStack = () => {
	const { state: { GCCData, country, scaleType, countryData }, changeCountry } = useContext(Context);
	return (
		<div className="row mt-5">
			<div className="col-md-6 mt-sm-4">
				<div className="card card-container">
					<ColumnChart data={GCCData} />
				</div>
			</div>
			<div className="col-md-6 mt-sm-4">
				<div className="card card-container">
					<GCCDailyData
						data={countryData}
						country={country}
						scaleType={scaleType}
						changeCountry={changeCountry}
					/>
				</div>
			</div>
		</div>
	);
};
