import React from 'react';
import { ZoomableGroup, ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';


const MapChart = ({ setTooltipContent, data, choice }) => {
	return (
		<div>
			<ComposableMap data-tip="" projectionConfig={{ scale: 1900, center: [ 47.738326, 24.477595 ] }}>
				<ZoomableGroup>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => (
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
												`${NAME} — ${data.find((element) => element.country === NAME)[choice]}`
											);
									}}
									onMouseLeave={() => {
										setTooltipContent('');
									}}
									style={{
										default: {
											fill: '#D6D6DA',
											outline: 'none'
										},
										hover: {
											fill: '#F53',
											outline: 'none'
										},
										pressed: {
											fill: '#E42',
											outline: 'none'
										}
									}}
								/>
							))}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</div>
	);
};

export default MapChart;
