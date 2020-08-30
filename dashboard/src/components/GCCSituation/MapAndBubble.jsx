import React, { useContext } from 'react';
import { Bubble } from './Bubble';
import { Context } from '../../contexts/GCCContext';
import { CustomMap } from './CustomMap';
import { GroupButton } from './GroupButton';
export const MapAndBubble = () => {
	const { state: { mapChoice, bubbleChoice, GCCData, mapName, bubbleName }, changeMap, changeBubble } = useContext(
		Context
	);
	function detectMob() {
		const toMatch = [ /Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i ];

		return toMatch.some((toMatchItem) => {
			return navigator.userAgent.match(toMatchItem);
		});
	}
	return (
		<div>
			<div className="row" style={{ display: 'flex' }}>
				<div className="col-md-6 mb-4">
					<div className="card card-container">
						<GroupButton onChange={changeMap} choice={mapChoice} name={mapName} />
						<CustomMap data={GCCData} choice={mapChoice} />
					</div>
				</div>
				<div className="col-md-6 mb-4">
					<div className="card card-container" style={{ height: detectMob() ? 500 : '100%', width: '100%' }}>
						<GroupButton onChange={changeBubble} choice={bubbleChoice} name={bubbleName} />
						<Bubble data={GCCData} choice={bubbleChoice} />
					</div>
				</div>
			</div>
		</div>
	);
};
