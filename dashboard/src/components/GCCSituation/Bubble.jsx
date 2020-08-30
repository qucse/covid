import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';

export const Bubble = ({ data, choice }) => {
	let root = {
		name: 'GCC',
		color: 'hsl(115, 70%, 50%)',
		children: [
			{
				name: data[0].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[0][choice]
			},
			{
				name: data[1].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[1][choice]
			},
			{
				name: data[2].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[2][choice]
			},
			{
				name: data[3].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[3][choice]
			},
			{
				name: data[4].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[4][choice]
			},
			{
				name: data[5].country,
				color: 'hsl(257, 70%, 50%)',
				loc: data[5][choice]
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
			labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 3 ] ] }}
			borderWidth={2}
			borderColor={{ from: 'color' }}
			animate={true}
			motionStiffness={90}
			motionDamping={12}
		/>
	);
};
