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
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: false})
const remoteData = require('./remote-api-helpers/remote-data');
const jobObjectHelper = require('./remote-api-helpers/jobObjectHelper');
const testHelper = require('./remote-api-helpers/testHelpers');
const exec = require('child_process').exec;
// Used at first for building the test array
const mysql = require('../mysql_setup.js');

userAgentCmdLineFormatter = (user_agent) => {
	// Summary: Takes in a request's user agent, and formats it
	// 			so it can be taken in as an `exec` command line argument.
	// 			Not sure if there's a standardised way to do this, but is
	// 			a quick fix.
	// Input: `user_agent` - the user agent header of a user
	// Returns: A user agent formatted in a way that can be passed as a command line argument
	return (
		user_agent.replace(/[();]/g, match => {
			if (match === ';') {
				return '^'
			} else if (match === '(') {
				return '*'
			} else if (match === ')') {
				return '+'
			}
		}).split(' ').join('-')
	);
}

makeRequest = (company, remoteObj, query = null) => {
	// Summary: Makes requests to specific company apis.
	// Input: `company` - The company with a specific API.
	// 		  `remoteObj` - The object containing all necessary information
	// 							for the company API to work and return data
	// 		  `query` - The query string given from the front end. Used to
	// 						filter information from APIs
	// Returns: A promise - Resolved with infomation of API call, or rejected
	// 							with an error.
	let responseObj = {
		company: null,
		response: null
	}

	return new Promise(( resolve, reject ) => {
		switch (company) {
			case 'USAJOBS':
				responseObj.company = 'USAJOBS';

				const usajobs_options = {
					url : remoteObj['url'] + '?Keyword=' + query,
					method : 'GET',
					headers : {
						"Host": remoteObj['host'],
						"User-Agent": remoteObj['user_agent'],
						"Authorization-Key": remoteObj['auth_key']
					}
				}

				request(usajobs_options, (err, resp, body) => {
					responseObj.response = JSON.parse(body);
					// console.log(responseObj.response.SearchResult.SearchResultItems)
					// Send it away, it's good
					resolve(responseObj);
				})
				break
			case 'CAREERJET':
				responseObj.company = 'CAREERJET';

				exec(`python routes/remote-api-helpers/career_jet_api_search.py ${remoteObj.url} ${userAgentCmdLineFormatter(remoteObj.user_agent)} ${remoteObj.url} ${query} ${remoteObj.auth_key}`,
					(err, stdout, stderr) => {
						if (err) rej(err);
						// console.log('stdout:', stdout, 'stderr:', stderr);
						responseObj.response = JSON.parse(stdout);
						resolve(responseObj);
					})
				break
			default:
				reject("You're not giving any sites that we know.")
		}
	})
}

handleResponse = (resObj) => {
	var _jobList = []
	return new Promise( ( resolve, reject ) => {
		if (typeof resObj === 'object') {
			let res = resObj.response;
			let company = resObj.company;

			if (company === 'USAJOBS') {
				let resItems = res.SearchResult.SearchResultItems;
				resItems.forEach((item) => {
					let  jO = jobObjectHelper.template();

					let jMeta = item.MatchedObjectDescriptor;
					let jLoc = jMeta.PositionLocation[0];
					let jComp = jMeta.PositionRemuneration[0];
					
					jO.remote = 'USA Jobs';
					jO.title = jMeta.PositionTitle;
					jO.company = jMeta.OrganizationName;
					jO.description = jMeta.QualificationSummary;
					jO.titleLink = jMeta.ApplyURI[0];
					jO.startDate = jMeta.PositionStartDate;
					jO.endDate = jMeta.PositionEndDate;
					jO.location.name = jLoc.LocationName;
					jO.location.latitude = jLoc.Latitude;
					jO.location.longitude = jLoc.Longitude;
					jO.compensation.minimum = jComp.MinimumRange;
					jO.compensation.maximum = jComp.MaximumRange;
					jO.compensation.rate = jComp.RateIntervalCode;

					_jobList.push(jO)
				})
				resolve(_jobList)
			} else if (company === 'CAREERJET') {
				let resItems = res.jobs
				resItems.forEach((item) => {
					let jO = jobObjectHelper.template();

					jO.remote = 'Careerjet'
					jO.title = item.title;
					jO.company = item.company;
					jO.description = item.description;
					jO.titleLink = item.url;
					jO.extWebsite = item.sites;
					jO.startDate = item.date;
					jO.location.name = item.locations;
					jO.compensation.salary = (item.salary === '') ? null : item.salary;

					_jobList.push(jO)
				})
				
				resolve(_jobList)
			} else {
				reject("Don't have a set-up for that company")
			}
		} else {
			reject("You are not inputting an object into this mf")
		}
	})
}

getRemoteObj = (req, company, remotes) => {
	// Summary: returns a remote options object that contains data specific
	// 			to the remote api that is being called.
	// Input: `req` - HTTP request stream.
	// 		  `company` - used to extract the remote object
	// 		  `remotes` - Object of remote objects
	// Returns: `remO` - A remote object containing data specific to requirements of remote API.
	let remO = remotes[company]

	switch (company) {
		case 'CAREERJET':
			remO.url = req.app.get('site-name');
			remO.user_ip = req.ip;
			remO.user_agent = req.headers['user-agent'];
			break
	}
	return remO
}

myConcat = (array, index = 0, _array = []) => {
	if (index < array.length) {
		let new_array = _array.concat(array[index]);
		let new_index = index + 1
		return myConcat(array, new_index , new_array)		
	} else {
		return _array;
	}
}

router.get('/test-call', (req, res, next) => {
	let remotes = remoteData.initialRemoteData()
	let promiseArray = [];
	let params = req.params;
	const query = 'Computers'

	for (var i = 0; i < Object.keys(remotes).length; i++) {
		let company = Object.keys(remotes)[i];
		let promise = makeRequest(company, getRemoteObj(req, company, remotes), query).then(handleResponse)
		promiseArray.push(promise);
	}

	Promise.all(promiseArray).then(values => {
		let new_values = myConcat(values)
		// mysql db connection
		new_values.map(( value, index ) => {
			let connection = mysql.getConn
			connection.query(`INSERT INTO test_jobs VALUES (null,
				?, ?, ?, ?, ?,
				?, ?, ?, ?, ?,
				?, ?, ?, ?, ?)`,
				[value.remote, value.title,
				 value.company, value.description,
				 value.extWebsite, value.titleLink,
				 value.startDate, value.endDate,
				 value.location.name, value.location.latitude,
				 value.location.longitude, value.compensation.minimum,
				 value.compensation.maximum, value.compensation.salary,
				 value.compensation.rate], (err, results, fields) => {
					console.log(results);
				})
			})
		}).catch( error => {
			console.error(error)
	})
})

router.get('/job-search', urlParser, (req, res, next) => {
	let params = req.query;
	if (params.test) {
		let connection = mysql.getConn;
		connection.query('SELECT * FROM test_jobs', (err, results, fields) => {
			let returnArray = testHelper.buildJobObjects(results)
			res.json(returnArray)
		})
	} else {
		let remotes = remoteData.initialRemoteData()
		let promiseArray = [];
		const query = 'Computers'

		for (var i = 0; i < Object.keys(remotes).length; i++) {
			let company = Object.keys(remotes)[i];
			let promise = makeRequest(company, getRemoteObj(req, company, remotes), query).then(handleResponse)
			promiseArray.push(promise);
		}

		Promise.all(promiseArray).then(values => {
			let new_values = myConcat(values)
			res.json(new_values);
		}).catch( error => {
			console.error(error)
		})
	}
})

module.exports = router;