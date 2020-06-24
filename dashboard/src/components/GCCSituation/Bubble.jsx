import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';

export const Bubble = ({ data }) => {
	let root = {
		name: 'GCC',
		color: 'hsl(115, 70%, 50%)',
		children: [
			{
				name: data[0].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[0].confirmed
			},
			{
				name: data[1].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[1].confirmed
			},
			{
				name: data[2].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[2].confirmed
			},
			{
				name: data[3].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[3].confirmed
			},
			{
				name: data[4].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[4].confirmed
			},
			{
				name: data[5].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[5].confirmed
			}
		]
	};
	return (
		<ResponsiveBubble
			root={root}
			margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
			identity="name"
			value="loc"
			colors={{ scheme: 'nivo' }}
			padding={6}
			labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
			borderWidth={2}
			borderColor={{ from: 'color' }}
			defs={[
				{
					id: 'lines',
					type: 'patternLines',
					background: 'none',
					color: 'inherit',
					rotation: -45,
					lineWidth: 5,
					spacing: 8
				}
			]}
			fill={[ { match: { depth: 1 }, id: 'lines' } ]}
			animate={true}
			motionStiffness={90}
			motionDamping={12}
		/>
	);
};
