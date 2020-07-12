/**
 * @description A helper fille to retrieve all the required COVID-19 information for all GCC countries 
 * using an open source API https://covid19api.com/
 * 
 * 
 * @author Abdelmonem Mohamed
 */

const axios = require('axios').default;
const countries = [ 'saudi-arabia', 'qatar', 'united-arab-emirates', 'kuwait', 'oman', 'bahrain' ];
const gcc = require('../data/GCC.json');
class GCC {
	/**
     * @description retrieve the data for a specific country
     * 
     * @param {string} country to retrieve the data for
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
	async getDataForCountry(country) {
		// const response = await axios.get('https://api.covid19api.com/total/country/' + country);
		let data = country;
		let lastData = data[data.length - 1];
		let previousLast = data[data.length - 2];
		console.log(lastData);
		console.log(previousLast);
		let date = new Date(lastData.Date);
		return {
			country: lastData.Country,
			date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
			newConfirmed: lastData.Confirmed - previousLast.Confirmed,
			confirmed: lastData.Confirmed,
			newDeaths: lastData.Deaths - previousLast.Deaths,
			deaths: lastData.Deaths,
			newRecovered: lastData.Recovered - previousLast.Recovered,
			recovered: lastData.Recovered,
			active: lastData.Active,
			newActive: lastData.Active - previousLast.Active
		};
	}

	/**
     * @description retrieve the daily data for a specific country
     * 
     * @param {string} country to retrieve the data for
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
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

	/**
     * @description retrieve all the data for all the gGCC countries 'bahrain', 'united-arab-emirates', 'kuwait', 'oman', 'saudi-arabia', * 'qatar' 
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
	async getDataForAllGCC() {
		let countriesResult = gcc.map(async (country) => await this.getDataForCountry(country));
		return await Promise.all(countriesResult);
	}
}

module.exports = new GCC();
