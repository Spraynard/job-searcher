const exec = require('child_process').exec;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36';
let F_USER_AGENT = USER_AGENT.replace(/[();]/g, match => {
	switch (match) {
		case ';':
			return '^'
		case '(':
			return '*'
		case ')':
			return '+'
	}}).split(' ').join('-');

const IP = '127.0.0.1';
const URL = 'http://localhost:3001/';
const KEYWORDS = 'Cannabis'
var results;

function fuckItUp(IP, USER_AGENT, URL, KEYWORDS) {
	return new Promise(( res, rej ) => {
		exec(`python routes/remote-api-scripts/career_jet_api_search.py ${IP} ${F_USER_AGENT} ${URL} ${KEYWORDS}`, (err, stdout, stderr) => {
			if (err) rej(err);
			// console.log('stdout:', stdout, 'stderr:', stderr);
			res(stdout);
		})
	})
}

fuckItUp(IP, F_USER_AGENT, URL, KEYWORDS)
	.then( jsonResponse => {
		results = JSON.parse(jsonResponse);
		console.log(results);
	})
	.then(null, console.error)
