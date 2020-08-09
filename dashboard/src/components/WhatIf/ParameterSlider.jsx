import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';

const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: 12,
				backgroundColor: 'rgba(0, 0, 0)'
			}
		}
	}
});
export const ParameterSlider = ({ marks, title }) => {
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
				<p className="pb-1 pt-3" style={{ fontSize: 18, fontWeight: 900 }}>
					{title}
				</p>
				<DatePicker
					disableToolbar
					allowKeyboardControl
					label="From"
					variant="inline"
					format="dd/MM/yyyy"
					style={{ marginRight: 3}}
				/>
				<DatePicker
					disableToolbar
					allowKeyboardControl
					label="To"
					variant="inline"
					format="dd/MM/yyyy"
				/>
			</div>

			<div
				className="btn-group btn-group-sm mb-2 mt-2"
				role="group"
				aria-label="Basic example"
				style={{ width: '100%' }}
			>
				{marks.map(
					(mark) =>
						mark.tooltip ? (
							<MuiThemeProvider theme={theme}>
								<Tooltip title={mark.tooltip} TransitionComponent={Fade} placement="top">
									<button
										type="button"
										className="btn btn-info"
										value={mark.value}
										style={{ fontSize: 15 }}
									>
										{mark.label}
									</button>
								</Tooltip>
							</MuiThemeProvider>
						) : (
							<button type="button" className="btn btn-info" value={mark.value} style={{ fontSize: 15 }}>
								{mark.label}
							</button>
						)
				)}
			</div>
		</div>
	);
};
