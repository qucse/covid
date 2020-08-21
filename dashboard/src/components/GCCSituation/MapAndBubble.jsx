import React, { useContext } from 'react';
import { Bubble } from './Bubble';
import { Context } from '../../contexts/GCCContext';
import { CustomMap } from './CustomMap';
import { GroupButton } from './GroupButton';

export const MapAndBubble = () => {
	const { state: { mapChoice, bubbleChoice, GCCData }, changeMap, changeBubble } = useContext(Context);

	return (
		<div>
			<div className="row" style={{ display: 'flex' }}>
				<div className="col-md-6">
					<div className="card card-container">
						<GroupButton
							onChange={changeMap}
							choice={mapChoice}
							style={{ height: '100%', width: '100%' }}
						/>
						<CustomMap data={GCCData} choice={mapChoice} />
					</div>
				</div>
				<div className="col-md-6">
					<div className="card card-container" style={{ height: '100%', width: '100%' }}>
						<GroupButton onChange={changeBubble} choice={bubbleChoice} />
						<Bubble data={GCCData} choice={bubbleChoice} />
					</div>
				</div>
			</div>
		</div>
	);
};
