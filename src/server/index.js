// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('../../dist'));

const port = 8000;

function logActiveServer() {
    console.log('Server running..');
    console.log(`localhost: ${port}`);
}

app.listen(port, () => {
    logActiveServer();
});

const projectData = {};

const confirmationMessage = {
    cod: 200,
    message: 'Success'
};

const errorMessage = {
    cod: 500,
    message: 'Internal Server Error'
};

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
    logActivatedService('HTTP GET Service: /', '', 'index.html');
})

app.get('/all', (request, response) => {
    response.send(projectData);
    logActivatedService('HTTP GET Service: /all', '', projectData);
});

function logActivatedService(service, requestLog, responseLog) {
    console.log(service);
    console.log('\nBody Request:\n', requestLog);
    console.log('\nBody Response:\n', responseLog);
    console.log('\nCurrent Project Data:\n', projectData);
    logActiveServer();
}