import createDataContext from './createDataContext';
import gcc from '../API/GCC';

const GCCReducer = (state, action) => {
	switch (action.type) {
		case 'load_GCC_data':
			return {
				...state,
				GCCData: action.payload,
				gccChange: false,
				originalDate: action.payload[0].lastUpdated,
				to: action.payload[0].date
			};
		case 'load_country_data':
			return { ...state, countryData: action.payload };
		case 'change_country':
			return { ...state, country: action.payload };
		case 'change_scale_type':
			return { ...state, scaleType: action.payload };
		case 'change_to':
			return { ...state, to: action.payload, gccChange: true };
		case 'change_map':
			return { ...state, mapChoice: action.payload };
		case 'change_bubble':
			return { ...state, bubbleChoice: action.payload };
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
const changeTo = (dispatch) => (scaleType) => {
	dispatch({ type: 'change_to', payload: scaleType });
};
const changeMap = (dispatch) => (choice) => {
	dispatch({ type: 'change_map', payload: choice });
};
const changeBubble = (dispatch) => (choice) => {
	dispatch({ type: 'change_bubble', payload: choice });
};

export const { Provider, Context } = createDataContext(
	GCCReducer,
	{ getGCCData, getCountryDailyData, changeCountry, changeScaleType, changeFrom, changeTo, changeMap, changeBubble },
	{
		GCCData: null,
		originalDate: null,
		countryData: null,
		country: 'qatar',
		scaleType: 'linear',
		to: null,
		gccChange: false,
		mapChoice: 1,
		bubbleChoice: 1
	}
);
