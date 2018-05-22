const axios = require('axios');
const config = require('./config.js');

function getWeather(location) {
	return axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
			params: {
				q: location,
				APPID: config.WEATHER_TOKEN,
				units: 'metric'
				}
			})
	.then(results => {
		return ({
			replies: [
			{ type : 'text', content: `Weather in ${results.data.name}`},
			{ type : 'text', content: results.data.weather[0].main},
			{ type : 'text', content: `Temperature: ${results.data.main.temp}°C`},
			]
		})
	})
	.catch(error => {
		if (error.response)
			return ({
				replies: [ 
				{ type: 'text', content: `Sorry, i did not find any data for ${location} :(`},
				{ type: 'text', content: `Try another city ?`},
				]
			})
	})
}

module.exports = getWeather;
