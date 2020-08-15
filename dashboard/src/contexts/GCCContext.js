import createDataContext from './createDataContext';
import gcc from '../API/GCC';

const GCCReducer = (state, action) => {
	switch (action.type) {
		case 'load_GCC_data':
			return { ...state, GCCData: action.payload, gccChange: false, originalDate: action.payload[0].lastUpdated };
		case 'load_country_data':
			return { ...state, countryData: action.payload };
		case 'change_country':
			return { ...state, country: action.payload };
		case 'change_scale_type':
			return { ...state, scaleType: action.payload };
		case 'change_from':
			return { ...state, from: action.payload };
		case 'change_to':
			return { ...state, to: action.payload, gccChange: true };
		default:
			return state;
	}
};

const getGCCData = (dispatch) => async (toDate) => {
	try {
		let data = await gcc.getDataForAllGCC(toDate);
		dispatch({ type: 'load_GCC_data', payload: data });
	} catch (error) {}
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
		originalDate: null,
		countryData: null,
		country: 'qatar',
		scaleType: 'linear',
		from: '2020-01-01',
		to: null,
		gccChange: false
	}
);
