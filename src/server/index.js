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
app.use(express.static('dist'));

const port = 8000;

function logActiveServer() {
    console.log('Server running..');
    console.log(`localhost: ${port}`);
}

app.listen(port, () => {
    logActiveServer();
});

// ServerServices for requesting external services
const { ServerServices } = require('./services');
const externalServices = ServerServices.getInstance();
externalServices.set('a44a01f0', '27308ad3bbef8950fc2482fbe1cfc4d1');


const projectData = {};

function successMessage(pContent) {
    return {
        cod: 200,
        message: 'Success',
        content: pContent
    };
}

function errorMessage(pContent) {
    return {
        cod: 500,
        message: 'Internal Server Error',
        content: pContent
    };
}

function requestAylienApi(endpoint, type, request, response) {
    let message;
    try {
        const externalResponse = externalServices.getSentimentAylienApi(type, 'tweet', request.body);
        console.log('BOMBOCLAT', externalResponse);
        message = successMessage(externalResponse);
        response.send(message);
        logActivatedService(`HTTP POST Service: ${endpoint}`, request.body, message);
    } catch (error) {
        message = errorMessage(error);
        response.send(message);
        logActivatedService(`HTTP POST Service: ${endpoint}`, request.body, message);
    }
    // externalServices.getSentimentAylienApi(type, 'tweet', request.body).then((externalResponse) => {
    //     console.log('BOMBOCLAT', externalResponse);
    //     message = successMessage(externalResponse);
    //     response.send(message);
    //     logActivatedService(`HTTP POST Service: ${endpoint}`, request.body, message);
    // }).catch((error) => {
    //     message = errorMessage(error);
    //     response.send(message);
    //     logActivatedService(`HTTP POST Service: ${endpoint}`, request.body, message);
    // });
}

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
    logActivatedService('HTTP GET Service: /', '', 'index.html');
})

app.get('/all', (request, response) => {
    response.send(projectData);
    logActivatedService('HTTP GET Service: /all', '', projectData);
});

app.post('/nlp/evaltext', (request, response) => {
    requestAylienApi('/nlp/evaltext', 'text', request, response);
});

app.post('/nlp/evalurl', (request, response) => {
    requestAylienApi('/nlp/evalurl', 'url', request, response);
});

function logActivatedService(service, requestLog, responseLog) {
    console.log(service);
    console.log('\nBody Request:\n', requestLog);
    console.log('\nBody Response:\n', responseLog);
    console.log('\nCurrent Project Data:\n', projectData);
    logActiveServer();
}