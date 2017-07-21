// The main goal of this. Currently.
// Want to have the user put in whatever they fuck they want.
// Unless a filter is specified, we will do a keyword only search. If filter is specified then those filters will be applied.
// Want to have it so that one request will go through all of the APIs that I have access to. All of the job information will 
// 		then be appended to a `JOB` object, which will then be sent back to the user in order to fill out the job information.

// So, what needs work?
// Currently my code is jumbled as fuck. Need to set up `api_infos` to contain all relevant information. Then I can loop throughout
// 	in order to make all of the API calls.
// * `makeRequest() - Needs to return the `request` information rather than just send it back as a response.
//					- Remove `res` as an input.
// 					- REQUIRED - Usage of promises to make sure that everything loads correctly and I'm not sending `undefined` bullshit.
const express = require('express');
const router = express.Router();
const request = require('request');

makeRequest = (url, method, host, user_agent, auth_key) => {
	const options = {
		url : url,
		method : method,
		headers: {
			"Host" : host,
			"User-Agent": user_agent,
			"Authorization-Key" : auth_key
		}
	}

	request(options, (err, response, body) => {
		let parsedBody = JSON.parse(body)
		return parsedBody;
	})
}

router.get('/test-call', (req, res, next) => {
	res.send("Hey there how are you?")
})

router.get('/job-search', (req, res, next) => {
	params = req.params;
	const api_infos = {
		'usa-jobs': {
			url: 'https://data.usajobs.gov/api/search',
			host: 'data.usajobs.gov',
			auth_key: 'vD0gKtjubimnE2eIkSmFUA6a/sRQNuxTJ4VI1p/SwH0='
		}
	}
	const query = '?Keyword=Computer;Computers;Server'

	makeRequest(api_infos['usa-jobs'].url + query, 
				'GET',
				api_infos['usa-jobs'].host,
				'kellan.martin@gmail.com',
				api_infos['usa-jobs'].auth_key);
})

module.exports = router;