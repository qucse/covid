/** 
* @description A helper fille to retrieve all the required COVID-19 information for Qatar 
* using an open source API https://www.data.gov.qa/api/
* 
* 
* @author Abdelmonem Mohamed
*/

const axios = require('axios').default;

class Qatar {
	/**
     * @description retrieve the daily data from the beginning of the pandemic until today
     * 
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
	async getQatarDailyData(toDate) {
		let response = await axios.get(
			'https://www.data.gov.qa/api/records/1.0/analyze/?dataset=covid-19-cases-in-qatar&x=date.year&x=date.month&x=date.day&sort=x.date.year,x.date.month,x.date.day&maxpoints=&y.cases.expr=number_of_new_positive_cases_in_last_24_hrs&y.cases.func=SUM&y.cases.cumulative=false&y.recovery.expr=number_of_new_recovered_cases_in_last_24_hrs&y.recovery.func=SUM&y.recovery.cumulative=false&y.deaths.expr=number_of_new_deaths_in_last_24_hrs&y.deaths.func=SUM&y.deaths.cumulative=false&timezone=Asia%2FBaghdad&lang=en'
		);
		let data = response.data;
		let qatarDailyData = [];
		let dates = [];
		let confirmed = [];
		let deaths = [];
		let recovered = [];
		let whatIfDaily = [];
		let whatIfDates = [];
		let whatIfConfirmed = [];
		let whatIfDeaths = [];
		let whatIfRecovered = [];
		data.forEach((element) => {
			if (toDate && new Date(toDate) < new Date(`${element.x.year}/${element.x.month}/${element.x.day}`)) return;
			dates.push(`${element.x.day}/${element.x.month}/${element.x.year}`);
			confirmed.push(element.cases);
			deaths.push(element.deaths);
			recovered.push(element.recovery);
		});
		data.forEach((element) => {
			whatIfDates.push(`${element.x.day}/${element.x.month}/${element.x.year}`);
			whatIfConfirmed.push(element.cases);
			whatIfDeaths.push(element.deaths);
			whatIfRecovered.push(element.recovery);
		});
		qatarDailyData.push(dates, confirmed, deaths, recovered);
		whatIfDaily.push(whatIfDates, whatIfConfirmed, whatIfDeaths, whatIfRecovered);
		return [ qatarDailyData, whatIfDaily ];
	}

	/**
     * @description retrieve the daily tests data from the beginning of the pandemic until today
     * 
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
	async getQatarDailyTestsData(toDate) {
		let response = await axios.get(
			'https://www.data.gov.qa/api/records/1.0/analyze/?dataset=covid-19-cases-in-qatar&x=date.year&x=date.month&x=date.day&y.test.expr=total_number_of_tests_to_date&y.test.func=SUM&y.test.cumulative=false'
		);
		let data = response.data;
		let qatarDailyTests = [];
		let dates = [];
		let tests = [];
		data.forEach((element, index) => {
			if (toDate && new Date(toDate) < new Date(`${element.x.year}/${element.x.month}/${element.x.day}`)) return;
			dates.push(`${element.x.day}/${element.x.month}/${element.x.year}`);
			if (index === 0) {
				tests.push(0);
				return;
			}
			tests.push(element.test - data[index - 1].test);
		});
		qatarDailyTests.push(dates, tests);
		return qatarDailyTests;
	}

	/**
     * @description retrieve the latest data of the COVID-19 cases
     * 
     * @requires axios
     * 
     * @author Abdelmonem Mohamed
     */
	async getLatestQatarData(toDate) {
		let url;
		toDate
			? (url = `https://www.data.gov.qa/api/records/1.0/search/?dataset=covid-19-cases-in-qatar&q=date=${toDate}`)
			: (url =
					'https://www.data.gov.qa/api/records/1.0/search/?sort=date&rows=1&dataset=covid-19-cases-in-qatar&timezone=Asia%2FBaghdad&lang=en#');
		let response = await axios.get(url);
		let data = response.data.records[0].fields;
		return {
			date: data.date,
			newConfirmed: data.number_of_new_positive_cases_in_last_24_hrs,
			confirmed: data.total_number_of_positive_cases_to_date,
			newRecovered: data.number_of_new_recovered_cases_in_last_24_hrs,
			recovered: data.total_number_of_recovered_cases_to_date,
			newDeaths: data.number_of_new_deaths_in_last_24_hrs,
			deaths: data.total_number_of_deaths_to_date,
			newIcu:
				data.number_of_new_icu_admissions_in_last_24_hrs_dd_lhlt_ljdyd_lty_tm_dkhlh_fy_l_ny_lmrkz_khll_l_24_s_lmd,
			icu: data.total_number_of_cases_under_icu_treatment_jmly_dd_lhlt_tht_l_lj_fy_l_ny_lmrkz,
			newHospitals:
				data.number_of_new_acute_hospital_admissions_in_last_24_hrs_dd_lhlt_lhd_ljdyd_lty_tm_dkhlh_fy_lmstshf_khl,
			hospitals: data.total_number_of_acute_cases_under_hospital_treatment_jmly_dd_lhlt_lhd_tht_l_lj_fy_lmstshf,
			totalActiveCases: data.total_number_of_active_cases_undergoing_treatment_to_date,
			newTests: data.number_of_new_tests_in_last_24_hrs,
			tests: data.total_number_of_tests_to_date,
			lastUpdatedOn: response.data.records[0].record_timestamp
		};
	}
}

export default new Qatar();
