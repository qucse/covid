import React, { useContext, useEffect } from 'react';
import { ParametersForm } from '../components/WhatIf/ParametersForm';
import { CountryAndGraph } from '../components/WhatIf/CountryAndGraph';
import { Graph } from '../components/WhatIf/Graph';
import Button from '@material-ui/core/Button';
import { Context } from '../contexts/whatIfContext';
export const WhatIf = () => {
	const {
		state: {
			schoolClosing,
			workspaceClosing,
			restrictionsOnGatherings,
			internationalTravelControls,
			closePublicTransport
		},
		getPrediction,
		loading
	} = useContext(Context);

	useEffect(() => {
		document.title = 'What If Analysis';
	}, []);
	return (
		<div className="container-fluid">
			<div className="row" style={{ display: 'flex', marginBottom: 3 }}>
				<div
					className="col-md-5 pr-0"
					style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
				>
					<ParametersForm />
				</div>
				<div
					className="col-md-7"
					style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
				>
					<CountryAndGraph />
					<Graph />
					<Button
						variant="contained"
						color="primary"
						fullWidth={true}
						onClick={() => {
							loading();
							getPrediction({
								schoolClosing,
								workspaceClosing,
								restrictionsOnGatherings,
								internationalTravelControls,
								closePublicTransport
							});
						}}
					>
						Apply Lockdown Measures
					</Button>
				</div>
			</div>
		</div>
	);
};
