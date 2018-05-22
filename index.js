const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const getWeather = require('./getWeather.js');

const app = express();
app.use(bodyParser.json());

app.post('/errors', (req, res) => {
	console.error(req.body);
	res.sendStatus(200);
},)

app.post('/give-meteo', (req, res) => {
	console.log('[POST] /give-meteo');
	const memory = req.body.conversation.memory;
	const location = memory.location.raw;

	return getWeather(location)
		.then((rep) => res.json(rep))
	.catch((err) => console.error('WeatherApi::getWeather error: ', err))
})

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));
