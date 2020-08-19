var axios = require('axios').default;

class whatIf {
	async getPredictions(data) {
		try {
			let response = await axios.post('https://qu-covid19-api.herokuapp.com/prediction', {
				data: JSON.stringify(data)
			});
			return response.data;
		} catch (error) {
			return error.message;
		}
	}
}

export default new whatIf();
