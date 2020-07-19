import React, { useContext } from 'react';
import { Bubble } from './Bubble';
import { Map } from './Map';
import { Context } from '../../contexts/GCCContext';
export const MapAndBubble = () => {
	const { state: { GCCData } } = useContext(Context);
	return (
		<div className="">
			<p>Last Updated On: {GCCData[0].date}</p>
			<div className="row">
				<div className="col-md-6">
					<div className="card">
						<div className="card-container" style={{ height: 500, width: '100%' }}>
							<Map data={GCCData} />
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="card">
						<div className="card-container" style={{ height: 500, width: '100%' }}>
							<Bubble data={GCCData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
