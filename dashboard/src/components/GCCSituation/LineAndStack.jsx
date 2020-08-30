import React, { useContext } from 'react';
import { ColumnChart } from './ColumnChart';
import { Radar } from './Radar';
import { Context } from '../../contexts/GCCContext';
export const LineAndStack = () => {
	const { state: { GCCData, radarName, radarChoice }, changeRadar } = useContext(Context);
	return (
		<div className="row mt-4">
			<div className="col-md-6 mb-4">
				<div className="card card-container">
					<ColumnChart data={GCCData} />
				</div>
			</div>
			<div className="col-md-6 mb-4">
				<div className="card card-container">
					{/* <GCCDailyData
						data={countryData}
						country={country}
						scaleType={scaleType}
						changeCountry={changeCountry}
					/> */}
					<Radar data={GCCData} name={radarName} choice={radarChoice} onChange={changeRadar} />
				</div>
			</div>
		</div>
	);
};
