import createDataContext from './createDataContext';
import qatar from '../API/Qatar';

const QatarReducer = (state, action) => {
	switch (action.type) {
		case 'load_qatar_data':
			return { ...state, latestInformation: action.payload };
		case 'load_qatar_daily':
			return { ...state, dailyData: action.payload };
		case 'load_qatar_tests':
			return { ...state, dailyTests: action.payload };
		default:
			return state;
	}
};

const getLatestQatarData = (dispatch) => async () => {
	let data = await qatar.getLatestQatarData();
	dispatch({ type: 'load_qatar_data', payload: data });
};

const getQatarDailyData = (dispatch) => async () => {
	let data = await qatar.getQatarDailyData();
	dispatch({ type: 'load_qatar_daily', payload: data });
};

const getQatarDailyTestsData = (dispatch) => async () => {
	let data = await qatar.getQatarDailyTestsData();
	dispatch({ type: 'load_qatar_tests', payload: data });
};

export const { Provider, Context } = createDataContext(
	QatarReducer,
	{ getLatestQatarData, getQatarDailyData, getQatarDailyTestsData },
	{
		latestInformation: null,
		dailyData: null,
		dailyTests: null
	}
);
