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
		case 'change_policy':
			return {
				...state,
				policy: action.policy,
				schoolClosing: { ...state.schoolClosing, level: action.payload[0] },
				workspaceClosing: { ...state.workspaceClosing, level: action.payload[1] },
				restrictionsOnGatherings: { ...state.restrictionsOnGatherings, level: action.payload[2] },
				closePublicTransport: { ...state.closePublicTransport, level: action.payload[3] },
				internationalTravelControls: { ...state.internationalTravelControls, level: action.payload[4] }
			};
		default:
			break;
	}
};

const policies = [
	{
		key: 1,
		value: [ 1, 1, 3, 1, 1 ]
	},
	{
		key: 2,
		value: [ 2, 2, 2, 1, 1 ]
	},
	{
		key: 3,
		value: [ 3, 1, 4, 2, 2 ]
	},
	{
		key: 4,
		value: [ 3, 2, 4, 2, 2 ]
	},
	{
		key: 5,
		value: [ 3, 3, 4, 2, 2 ]
	}
];

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

const changePolicy = (dispatch) => async (change) => {
	dispatch({
		type: 'change_policy',
		payload: policies.find((element) => element.key === change)['value'],
		policy: policies.find((element) => element.key === change)['key']
	});
};

export const { Provider, Context } = createDataContext(
	whatIfReducer,
	{
		getPrediction,
		changeSchoolClosing,
		changeWorkspaceClosing,
		changeClosePublicTransport,
		changePolicy,
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
		whatIfChange: false,
		policy: 1
	}
);
