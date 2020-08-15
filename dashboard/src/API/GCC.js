const axios = require('axios').default;
const countries = [ 'Saudi Arabia', 'Qatar', 'United Arab Emirates', 'Kuwait', 'Oman', 'Bahrain' ];
class GCC {
	async getDataForCountry(country, toDate) {
		try {
			const response = await axios.get('https://qu-covid19-api.herokuapp.com/data?country=' + country);
			let data = response.data;
			let lastData;
			let previousLast;
			let index;
			if (toDate) {
				data.forEach((element, k) => {
					if (element.date == toDate) index = k;
				});
				lastData = data[index];
				previousLast = data[--index];
			} else {
				lastData = data[data.length - 1];
				previousLast = data[data.length - 3];
			}
			let active = lastData.confirmed - (lastData.recovered + lastData.deaths);
			let previousActive = previousLast.confirmed - (previousLast.recovered + previousLast.deaths);
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
				internationalTravelControls: lastData.international_movement_restrictions,
				lastUpdated: lastData.lastUpdated
			};
		} catch (error) {
			return error;
		}
	}

	async getDailyForCountry(country, cartesian, from, to) {
		let url = 'https://api.covid19api.com/total/country/' + country + `?from=${from}&to=${to}`;
		const response = await axios.get(url);
		let data = response.data,
			countryDailyData = [],
			dates = [],
			confirmed = [],
			deaths = [],
			recovered = [];
		if (cartesian === 'daily') {
			data.forEach((element, index) => {
				if (element.Confirmed === 0 && element.Recovered === 0 && element.Deaths === 0) return;
				let date = new Date(element.Date);
				dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
				if (index === 0) {
					confirmed.push(element.Confirmed);
					deaths.push(element.Deaths);
					recovered.push(element.Recovered);
				} else {
					confirmed.push(element.Confirmed - data[index - 1].Confirmed);
					deaths.push(element.Deaths - data[index - 1].Deaths);
					recovered.push(element.Recovered - data[index - 1].Recovered);
				}
			});
			countryDailyData.push(dates, confirmed, deaths, recovered);
		} else if (cartesian === 'linear' || cartesian === 'logarithmic') {
			data.forEach((element, index) => {
				if (element.Confirmed === 0 && element.Recovered === 0 && element.Deaths === 0) return;
				let date = new Date(element.Date);
				dates.push(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
				confirmed.push(element.Confirmed);
				deaths.push(element.Deaths);
				recovered.push(element.Recovered);
			});
			countryDailyData.push(dates, confirmed, deaths, recovered);
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

// m.getDataForCountry('Qatar', '2020-04-06').then((k) => console.log(k));
