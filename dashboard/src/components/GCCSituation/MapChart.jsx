import React from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import LinearGradient from './LinearGradient';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ setTooltipContent, data, choice }) => {
	function isIncluded(geo, right, wrong) {
		return [ 'Saudi Arabia', 'Qatar', 'United Arab Emirates', 'Kuwait', 'Oman', 'Bahrain' ].includes(
			geo.properties.NAME
		)
			? right
			: wrong;
	}
	const COLOR_RANGE = [
			'rgb(255, 247, 236)',
			'rgb(254, 232, 200)',
			'rgb(253, 212, 158)',
			'rgb(253, 187, 132)',
			'rgb(252, 141, 89)',
			'rgb(239, 101, 72)',
			'rgb(215, 48, 31)',
			'rgb(179, 0, 0)',
			'rgb(127, 0, 0)'
		],
		DEFAULT_COLOR = '#EEE',
		gradientData = {
			fromColor: COLOR_RANGE[0],
			toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
			min: Math.min(...data.map((element) => element[choice])),
			max: Math.max(...data.map((element) => element[choice]))
		};
	let m = data.map((d) => d[choice]).sort((a, b) => a - b);
	const colorScale = scaleQuantile().domain(m).range(COLOR_RANGE);

	return (
		<div>
			<ComposableMap data-tip="" projectionConfig={{ scale: 1900, center: [ 47.738326, 24.477595 ] }}>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
								const current = data.find((s) => s.country === geo.properties.NAME);
								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={() => {
											const { NAME } = geo.properties;
											if (
												[
													'Saudi Arabia',
													'Qatar',
													'United Arab Emirates',
													'Kuwait',
													'Oman',
													'Bahrain'
												].includes(NAME)
											)
												setTooltipContent(
													`${NAME} — ${data.find((element) => element.country === NAME)[
														choice
													]}`
												);
										}}
										onMouseLeave={() => {
											setTooltipContent('');
										}}
										style={{
											default: {
												fill: current ? colorScale(current[choice]) : DEFAULT_COLOR,
												outline: 'none',
												stroke: isIncluded(geo, '#333', null),
												strokeWidth: isIncluded(geo, 0.5, null)
											},
											hover: {
												fill: current ? colorScale(current[choice]) : DEFAULT_COLOR,
												outline: 'none',
												stroke: isIncluded(geo, '#333', null),
												strokeWidth: isIncluded(geo, 0.5, null)
											}
										}}
									/>
								);
							})}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
			<LinearGradient data={gradientData} />
		</div>
	);
};

export default MapChart;
