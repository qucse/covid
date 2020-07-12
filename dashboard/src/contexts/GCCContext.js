import createDataContext from './createDataContext';
import gcc from '../API/GCC';

const GCCReducer = (state, action) => {
	switch (action.type) {
		case 'load_GCC_data':
			console.log(action.payload);
			return { ...state, GCCData: action.payload };
		case 'load_country_data':
			return { ...state, countryData: action.payload };
		case 'change_country':
			return { ...state, country: action.payload };
		case 'change_scale_type':
			return { ...state, scaleType: action.payload };
		case 'change_from':
			return { ...state, from: action.payload };
		case 'change_to':
			return { ...state, to: action.payload };
		default:
			return state;
	}
};

const getGCCData = (dispatch) => async () => {
	let data = await gcc.getDataForAllGCC();
	dispatch({ type: 'load_GCC_data', payload: data });
};

const getCountryDailyData = (dispatch) => async (country, scaleType, from, to) => {
	let data = await gcc.getDailyForCountry(country, scaleType, from, to);
	dispatch({ type: 'load_country_data', payload: data });
};

const changeCountry = (dispatch) => (country) => {
	dispatch({ type: 'change_country', payload: country });
};

const changeScaleType = (dispatch) => (scaleType) => {
	dispatch({ type: 'change_scale_type', payload: scaleType });
};
const changeFrom = (dispatch) => (scaleType) => {
	dispatch({ type: 'change_from', payload: scaleType });
};
const changeTo = (dispatch) => (scaleType) => {
	dispatch({ type: 'change_to', payload: scaleType });
};

export const { Provider, Context } = createDataContext(
	GCCReducer,
	{ getGCCData, getCountryDailyData, changeCountry, changeScaleType, changeFrom, changeTo },
	{
		GCCData: null,
		countryData: null,
		country: 'saudi-arabia',
		scaleType: 'daily',
		from: '2020-01-01',
		to: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}`
	}
);
