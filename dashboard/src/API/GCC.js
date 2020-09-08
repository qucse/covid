const axios = require('axios').default;
const countries = [ 'Saudi Arabia', 'Qatar', 'United Arab Emirates', 'Kuwait', 'Oman', 'Bahrain' ];
const _ = require('lodash');
class GCC {
	async getDataForCountry(country, toDate) {
		try {
			const response = await axios.get('https://qu-covid19-api.herokuapp.com/data?country=' + country);
			let data = response.data;
			let lastData;
			let previousLast;
			let index;
			data.sort(function(a, b) {
				var dateA = new Date(a.date),
					dateB = new Date(b.date);
				return dateA - dateB;
			});
			data = _.uniqBy(data, function(e) {
				return e.date;
			});
			data.splice(-1, 1);
			if (toDate) {
				data.forEach((element, k) => {
					if (element.date === toDate) index = k;
				});
				lastData = data[index];
				previousLast = data[index - 1];
			} else {
				lastData = data[data.length - 1];
				previousLast = data[data.length - 2];
			}
			let active = lastData.confirmed - (lastData.recovered + lastData.deaths),
				previousActive = previousLast.confirmed - (previousLast.recovered + previousLast.deaths),
				mortality = lastData.deaths / lastData.confirmed * 100,
				previousMortality = previousLast.deaths / previousLast.confirmed * 100;

			return {
				country: lastData.administrative_area_level_1,
				date: lastData.date,
				newConfirmed: lastData.confirmed - previousLast.confirmed,
				confirmed: lastData.confirmed,
				newDeaths: lastData.deaths - previousLast.deaths,
				deaths: lastData.deaths,
				newRecovered: lastData.recovered - previousLast.recovered,
				recovered: lastData.recovered,
				active: lastData.confirmed - (lastData.recovered + lastData.deaths),
				newActive: active - previousActive,
				schoolClosing: lastData.school_closing,
				workspaceClosing: lastData.workplace_closing,
				restrictionsOnGatherings: lastData.gatherings_restrictions,
				closePublicTransport: lastData.transport_closing,
				population: lastData.population,
				mortality: mortality.toFixed(2),
				icu: lastData.icu,
				newIcu: lastData.icu - previousLast.icu,
				hospitals: lastData.hosp,
				newHospitals: lastData.hosp - previousLast.hosp,
				tests: lastData.tests,
				newTests: lastData.tests - previousLast.tests,
				newMortality: (mortality - previousMortality).toFixed(2),
				stringency: lastData.stringency_index,
				newStringency: (lastData.stringency_index - previousLast.stringency_index).toFixed(2),
				internationalTravelControls: lastData.international_movement_restrictions,
				lastUpdated: lastData.lastUpdated
			};
		} catch (error) {
			return error;
		}
	}

	async getDailyForCountry(country, cartesian, to, daysToPredict) {
		let url = 'https://qu-covid19-api.herokuapp.com/data?country=' + country;
		const response = await axios.get(url);

		let data = response.data,
			countryDailyData = [],
			dates = [],
			confirmed = [],
			deaths = [],
			tests = [],
			predictions = [],
			recovered = [];
		data.sort(function(a, b) {
			var dateA = new Date(a.date),
				dateB = new Date(b.date);
			return dateA - dateB;
		});
		data = _.uniqBy(data, function(e) {
			return e.date;
		});
		data.splice(-1,1)
		if (to) data = data.slice(0, data.indexOf(data.find((element) => element.date === to)) + 1);
		const parameter = {
			country: data[data.length - 1].id,
			daysToPredict,
			startDate: to ? to : data[data.length - 1].date,
			lockdown: {
				schoolClosing: {
					name: 'school',
					level: data[data.length - 1].school_closing,
					fromDate: '2020-04-01',
					toDate: '2020-12-31'
				},
				workspaceClosing: {
					level: data[data.length - 1].workplace_closing,
					name: 'work',
					fromDate: '2020-04-01',
					toDate: '2020-12-31'
				},
				restrictionsOnGatherings: {
					level: data[data.length - 1].gatherings_restrictions,
					name: 'gathering',
					fromDate: '2020-04-01',
					toDate: '2020-12-31'
				},
				closePublicTransport: {
					level: data[data.length - 1].transport_closing,
					name: 'pt',
					fromDate: '2020-04-01',
					toDate: '2020-12-31'
				},
				internationalTravelControls: {
					level: data[data.length - 1].international_movement_restrictions,
					name: 'travel',
					fromDate: '2020-04-01',
					toDate: '2020-12-31'
				}
			}
		};
		const predictionResponse = await axios.post('http://localhost:5000/prediction', {
				data: JSON.stringify(parameter)
			}),
			predictionData = predictionResponse.data;

		if (cartesian === 'daily') {
			data.forEach((element, index) => {
				if (element.confirmed === 0 && element.recovered === 0 && element.deaths === 0) return;
				let date = new Date(element.date);
				dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
				if (index === 0) {
					confirmed.push(element.confirmed);
					deaths.push(element.deaths);
					tests.push(element.tests);
					recovered.push(element.recovered);
				} else {
					confirmed.push(element.confirmed - data[index - 1].confirmed);
					deaths.push(element.deaths - data[index - 1].deaths);
					tests.push(element.tests - data[index - 1].tests);
					recovered.push(element.recovered - data[index - 1].recovered);
				}
			});
			confirmed = _.concat(confirmed, predictionData.data);
			countryDailyData.push(dates, confirmed, deaths, recovered, tests);
		} else if (cartesian === 'linear' || cartesian === 'logarithmic') {
			data.forEach((element, index) => {
				if (element.confirmed === 0 && element.recovered === 0 && element.deaths === 0) return;
				let date = new Date(element.date);
				dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
				confirmed.push(element.confirmed);
				tests.push(element.tests - data[index - 1].tests);
				deaths.push(element.deaths);
				recovered.push(element.recovered);
			});
			countryDailyData.push(dates, confirmed, deaths, recovered, tests);
		}
		return countryDailyData;
	}
	async getDataForAllGCC(toDate) {
		let countriesResult = countries.map(async (country) => await this.getDataForCountry(country, toDate));
		return await Promise.all(countriesResult);
	}
}

export default new GCC();
// let m = new GCC();

// m.getDailyForCountry('Qatar', 'daily', null).then((k) => console.log(k));
