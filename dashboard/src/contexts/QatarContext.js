import createDataContext from './createDataContext';
import qatar from '../API/Qatar';

const QatarReducer = (state, action) => {
	switch (action.type) {
		case 'load_qatar_data':
			return {
				...state,
				latestInformation: action.payload,
				originalDate: action.payload.lastUpdatedOn,
				qatarChange: false,
				toDate: action.payload.date
			};
		case 'load_qatar_daily':
			return { ...state, dailyData: action.payload[0], whatIfDaily: action.payload[1] };
		case 'load_qatar_tests':
			return { ...state, dailyTests: action.payload };
		case 'change_date':
			return { ...state, toDate: action.payload, qatarChange: true };
		default:
			return state;
	}
};

const getLatestQatarData = (dispatch) => async (toDate) => {
	let data = await qatar.getLatestQatarData(toDate);
	dispatch({ type: 'load_qatar_data', payload: data });
};

const getQatarDailyData = (dispatch) => async (toDate) => {
	let data = await qatar.getQatarDailyData(toDate);
	dispatch({ type: 'load_qatar_daily', payload: data });
};

const getQatarDailyTestsData = (dispatch) => async (toDate) => {
	let data = await qatar.getQatarDailyTestsData(toDate);
	dispatch({ type: 'load_qatar_tests', payload: data });
};

const onDateChange = (dispatch) => (date) => {
	dispatch({ type: 'change_date', payload: date });
};

export const { Provider, Context } = createDataContext(
	QatarReducer,
	{ getLatestQatarData, getQatarDailyData, getQatarDailyTestsData, onDateChange },
	{
		toDate: null,
		originalDate: null,
		latestInformation: null,
		dailyData: null,
		dailyTests: null,
		qatarChange: false,
		whatIfDaily: null
	}
);
