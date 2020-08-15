import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
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
export const ParameterSlider = ({ marks, title, object, onChange }) => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					alignItems: 'baseline',
					justifyContent: 'space-around',
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
					variant="inline"
					label={'From'}
					format="dd/MM/yyyy"
					style={{ marginRight: 3 }}
					value={object.fromDate}
					onChange={(date) => {
						let month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
						let ndate = date.getUTCDate();
						let year = date.getUTCFullYear();
						let newDate = `${year}-${month}-${ndate}`;
						onChange({ ...object, fromDate: newDate });
					}}
				/>
				<DatePicker
					disableToolbar
					allowKeyboardControl
					label={'To'}
					variant="inline"
					format="dd/MM/yyyy"
					value={object.toDate}
					onChange={(date) => {
						let month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;
						let ndate = date.getUTCDate();
						let year = date.getUTCFullYear();
						let newDate = `${year}-${month}-${ndate}`;
						onChange({ ...object, toDate: newDate });
					}}
				/>
			</div>

			<div className="btn-group btn-group-sm mb-1 mt-1" role="group" style={{ width: '100%' }}>
				{marks.map(
					(mark, key) =>
						mark.tooltip ? (
							<MuiThemeProvider theme={theme} key={key}>
								<Tooltip title={mark.tooltip} TransitionComponent={Fade} placement="top">
									<label className="btn btn-info">
										<input
											type="radio"
											name={object.name}
											value={mark.value}
											key={key}
											defaultChecked={object.level === mark.value ? true : false}
											onClick={(event) => {
												onChange({ ...object, level: parseInt(event.target.value) });
											}}
										/>
										{' ' + mark.label}
									</label>
								</Tooltip>
							</MuiThemeProvider>
						) : (
							<label className="btn btn-info" key={key}>
								<input
									type="radio"
									name={object.name}
									key={key}
									value={mark.value}
									defaultChecked={object.level === mark.value ? true : false}
									onClick={(event) => {
										onChange({ ...object, level: parseInt(event.target.value) });
									}}
								/>
								{' ' + mark.label}
							</label>
						)
				)}
			</div>
		</div>
	);
};
