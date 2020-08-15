const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(
		proxy('', {
			target: 'https://qu-covid19-api.herokuapp.com',
			changeOrigin: true
		})
	);
};
