/**
 * @description A helper fille to retrieve all the required COVID-19 information for all GCC countries 
 * using an open source API https://covid19api.com/
 * 
 * 
 * @author Abdelmonem Mohamed
 */

const axios = require('axios').default;
const countries = [ 'bahrain', 'united-arab-emirates', 'kuwait', 'oman', 'saudi-arabia', 'qatar' ];

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
		const response = await axios.get('https://api.covid19api.com/total/country/' + country);
		let data = response.data;
		let lastData = data[data.length - 1];
		let previousLast = data[data.length - 2];
		return {
			country: lastData.Country,
			date: lastData.Date,
			newConfirmed: lastData.Confirmed - previousLast.Confirmed,
			confirmed: lastData.Confirmed,
			newDeaths: lastData.Deaths - previousLast.Deaths,
			deaths: lastData.Deaths,
			newRecovered: lastData.Recovered - previousLast.Recovered,
			recovered: lastData.Recovered,
			active: lastData.Active
		};
	}

	/**
     * @description retrieve all the data for all the gGCC countries 'bahrain', 'united-arab-emirates', 'kuwait', 'oman', 'saudi-arabia', * 'qatar' 
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
	async getDataForAllGCC() {
		let countriesResult = countries.map(async (country) => await this.getDataForCountry(country));
		return await Promise.all(countriesResult);
	}
}

module.exports = new GCC();