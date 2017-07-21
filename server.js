const express = require('express');
const app = express();
const port = process.argv[2] || 3001

const apiEndPoints = require('./routes/apiEndPoints.js');


app.use('/api', apiEndPoints);


app.listen(port, () => {
	console.log(`This server is listening on port ${port}`)
})
