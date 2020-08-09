import createDataContext from './createDataContext';

const whatIfReducer = (state, action) => {
	switch (action.type) {
		case '':
			return;
		default:
			break;
	}
};

export const { Provider, Context } = createDataContext(
	whatIfReducer,
	{},
	{
		country: 'qatar',
		metric: 'confirmed'
	}
);
