import React from 'react';
import Slider from '@material-ui/core/Slider';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

export const ParameterSlider = ({ marks, title, tooltip }) => {
	function valuetext(value) {
		return `${value}°C`;
	}

	function valueLabelFormat(value) {
		return marks[marks.findIndex((mark) => mark.value === value)].label;
	}

	return (
		<div>
			<div
				style={{
					display: 'flex',
					alignItems: 'baseline',
					justifyContent: 'space-between',
					marginBottom: 5,
					paddingTop: 3
				}}
			>
				<Tooltip
					TransitionComponent={Fade}
					TransitionProps={{ timeout: 600 }}
					placement="right"
					title={tooltip}
				>
					<p className="pb-1 pt-3" style={{ fontSize: 18, fontWeight: 900 }}>
						{title}
					</p>
					{/* <ErrorOutlineIcon /> */}
				</Tooltip>

				<TextField
					id="date"
					label="From"
					type="date"
					fullWidth={false}
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField
					id="date"
					label="To"
					type="date"
					InputLabelProps={{
						shrink: true
					}}
				/>
			</div>
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
