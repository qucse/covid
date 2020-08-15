import React, { useContext } from 'react';
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
	
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-5 pr-0">
					<ParametersForm />
				</div>
				<div className="col-md-7">
					<CountryAndGraph />
					<Graph />
					<Button
						variant="contained"
						className="mt-3"
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
