var axios = require('axios').default,
	_ = require('lodash');

class whatIf {
	async getPredictions(data) {
		// console.log(data)
		try {
			const countries = [
				{
					key: 'QAT',
					value: 'Qatar'
				},
				{
					key: 'ARE',
					value: 'United Arab Emirates'
				},
				{
					key: 'KWT',
					value: 'Kuwait'
				}
			];
			let url =
				'https://qu-covid19-api.herokuapp.com/data?country=' +
				countries.find((element) => element.key === data.country).value;
			let secondResponse = await axios.get(url);

			let countryData = secondResponse.data,
				countryDailyData = [],
				dates = [],
				confirmed = [];
			data.startDate = countryData[countryData.length - 1].date;
			console.log(data);
			let response = await axios.post('https://qu-covid19-api.herokuapp.com/whatIf', {
				data: JSON.stringify(data)
			});

			let predictions = response.data.data;
			countryData.sort(function(a, b) {
				var dateA = new Date(a.date),
					dateB = new Date(b.date);
				return dateA - dateB;
			});
			countryData = _.uniqBy(countryData, function(e) {
				return e.date;
			});
			countryData.splice(-1, 1);
			countryData.forEach((element, index) => {
				if (element.confirmed === 0 && element.recovered === 0 && element.deaths === 0) return;
				let date = new Date(element.date);
				dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
				if (index === 0) {
					confirmed.push(element.confirmed);
				} else {
					confirmed.push(element.confirmed - countryData[index - 1].confirmed);
				}
			});
			console.log(predictions);
			let predictionsArray = _.concat(confirmed, predictions);
			countryDailyData.push(dates, confirmed, predictionsArray);
			return countryDailyData;
		} catch (error) {
			return error.message;
		}
	}
}

export default new whatIf();
