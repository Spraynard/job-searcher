const express = require('express');
const app = express();
const port = process.argv[2] || 3001

const apiEndPoints = require('./routes/apiEndPoints.js');

// `site-name` is data sent to the careerjet api
app.set('site-name', 'http://localhost:3001');

// `apiEndPoints` is a route located in /routes 
app.use('/api', apiEndPoints);

app.listen(port, () => {
	console.log(`This server is listening on port ${port}`)
})
