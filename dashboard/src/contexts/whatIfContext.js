import createDataContext from './createDataContext';
import whatIf from '../API/whatIf';

const whatIfReducer = (state, action) => {
	switch (action.type) {
		case 'change_school':
			return { ...state, schoolClosing: action.payload };
		case 'change_workspace':
			return { ...state, workspaceClosing: action.payload };
		case 'change_gatherings':
			return { ...state, restrictionsOnGatherings: action.payload };
		case 'change_PT':
			return { ...state, closePublicTransport: action.payload };
		case 'change_travel':
			return { ...state, internationalTravelControls: action.payload };
		case 'set_predictions':
			return { ...state, predictions: action.payload, whatIfChange: false };
		case 'change':
			return { ...state, whatIfChange: true };
		default:
			break;
	}
};

const changeSchoolClosing = (dispatch) => async (object) => {
	dispatch({ type: 'change_school', payload: object });
};

const changeWorkspaceClosing = (dispatch) => async (object) => {
	dispatch({ type: 'change_workspace', payload: object });
};

const changeRestrictionsOnGatherings = (dispatch) => async (object) => {
	dispatch({ type: 'change_gatherings', payload: object });
};

const changeClosePublicTransport = (dispatch) => async (object) => {
	dispatch({ type: 'change_PT', payload: object });
};

const changeInternationalTravelControls = (dispatch) => async (object) => {
	dispatch({ type: 'change_travel', payload: object });
};

const loading = (dispatch) => () => {
	dispatch({ type: 'change' });
};

const getPrediction = (dispatch) => async (lockDowns) => {
	let data = await whatIf.getPredictions(lockDowns);
	dispatch({ type: 'set_predictions', payload: data });
};

export const { Provider, Context } = createDataContext(
	whatIfReducer,
	{
		getPrediction,
		changeSchoolClosing,
		changeWorkspaceClosing,
		changeClosePublicTransport,
		changeInternationalTravelControls,
		changeRestrictionsOnGatherings,
		loading
	},
	{
		schoolClosing: {
			name: 'school',
			level: 3,
			fromDate: '2020-04-01',
			toDate: '2020-12-31'
		},
		workspaceClosing: {
			level: 2,
			name: 'work',
			fromDate: '2020-04-01',
			toDate: '2020-12-31'
		},
		restrictionsOnGatherings: {
			level: 3,
			name: 'gathering',
			fromDate: '2020-04-01',
			toDate: '2020-12-31'
		},
		closePublicTransport: {
			level: 1,
			name: 'pt',
			fromDate: '2020-04-01',
			toDate: '2020-12-31'
		},
		internationalTravelControls: {
			level: 3,
			name: 'travel',
			fromDate: '2020-04-01',
			toDate: '2020-12-31'
		},
		predictions: null,
		whatIfChange: false
	}
);
