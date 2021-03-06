import createDataContext from './createDataContext';
import gcc from '../API/GCC';

const GCCReducer = (state, action) => {
	switch (action.type) {
		case 'load_GCC_data':
			return {
				...state,
				GCCData: action.payload,
				gccChange: false,
				to: action.payload[0].date,
				originalDate: action.payload[0].lastUpdated
			};
		case 'load_country_data':
			return { ...state, countryData: action.payload, gccChange: false };
		case 'change_country':
			return { ...state, country: action.payload, gccChange: true };
		case 'change_scale_type':
			return { ...state, scaleType: action.payload, gccChange: true };
		case 'change_to':
			return { ...state, to: action.payload, gccChange: true };
		case 'change_map':
			return { ...state, mapChoice: action.payload };
		case 'change_bubble':
			return { ...state, bubbleChoice: action.payload };
		case 'change_radar':
			return { ...state, radarChoice: action.payload };
		case 'change_range':
			return { ...state, range: action.payload, gccChange: true };
		default:
			return state;
	}
};

const getGCCData = (dispatch) => async (toDate) => {
	try {
		let data = await gcc.getDataForAllGCC(toDate);
		data.sort((a, b) => b.confirmed - a.confirmed);
		dispatch({ type: 'load_GCC_data', payload: data });
	} catch (error) {}
};
const getCountryDailyData = (dispatch) => async (country, scaleType, to, range) => {
	let data = await gcc.getDailyForCountry(country, scaleType, to, range);
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
const changeRadar = (dispatch) => (choice) => {
	dispatch({ type: 'change_radar', payload: choice });
};
const changeRange = (dispatch) => (choice) => {
	dispatch({ type: 'change_range', payload: choice });
};
export const { Provider, Context } = createDataContext(
	GCCReducer,
	{
		getGCCData,
		getCountryDailyData,
		changeCountry,
		changeScaleType,
		changeTo,
		changeMap,
		changeBubble,
		changeRadar,
		changeRange
	},
	{
		GCCData: null,
		originalDate: null,
		countryData: null,
		country: 'Qatar',
		scaleType: 'daily',
		to: null,
		gccChange: false,
		mapChoice: 'active',
		bubbleChoice: 'active',
		radarChoice: 'active',
		mapName: 'map',
		radarName: 'radar',
		bubbleName: 'bubble',
		range: 15
	}
);
