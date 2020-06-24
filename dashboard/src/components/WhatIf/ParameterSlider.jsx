import React from 'react';
import Slider from '@material-ui/core/Slider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';

export const ParameterSlider = ({ marks, title, tooltip }) => {
	function valuetext(value) {
		return `${value}°C`;
	}

	function valueLabelFormat(value) {
		return marks.findIndex((mark) => mark.value === value);
	}

	return (
		<div>
			<p className="pb-1 pt-3" style={{ fontSize: 20 }}>
				{title}
				<Tooltip
					TransitionComponent={Fade}
					TransitionProps={{ timeout: 600 }}
					placement="right"
					title={tooltip}
				>
					<ErrorOutlineIcon className={'ml-3'} />
				</Tooltip>
			</p>
			<Slider
				defaultValue={0}
				valueLabelFormat={valueLabelFormat}
				getAriaValueText={valuetext}
				aria-labelledby="discrete-slider-restrict"
				step={null}
				valueLabelDisplay="auto"
				marks={marks}
			/>
		</div>
	);
};
