import "babel-polyfill";
const { Services } = require('./services');

const services = Services.getInstance();
services.set('http://localhost:8000');

function validateUrl(value) { //taken from https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function submit(query, inputToEval, expectedOutput) {
    return services.postRequestLocalServer(query, { 'content': inputToEval }).then((response) => {
        try {
            services.handleResponse(response, () => {
                expect(services.serviceData).toMatchObject(expectedOutput);
            });
        } catch (error) {
            expect(error).toMatch(expectedOutput);
        }
    }).catch(() => {
        expect('503 Server Error Connection Timeout').toMatch(expectedOutput);
    });
}

function formButtonClick(form, expectedOutput) {
    const activeFormInput = form.activeFormInput;
    let query;
    let inputToEval;
    if (activeFormInput === 'url') {
        inputToEval = form.urlToEval;
        query = services.queryNlpUrl;
        if (validateUrl(inputToEval)) {
            return submit(query, inputToEval, expectedOutput);
        } else {
            expect('Error Not Valid URL Structure').toMatch(expectedOutput);
        }
    } else if (activeFormInput === 'text') {
        inputToEval = form.textToEval;
        query = services.queryNlpText;
        return submit(query, inputToEval, expectedOutput);
    }
}


describe("[submit form]", () => {
    const input = [
        { activeFormInput: 'url', urlToEval: 'https://codequickie.com/what-is-python-and-what-can-you-do-with-it/' },
        { activeFormInput: 'text', textToEval: 'I had a very good time in the restaurant, the service was really good.' },
        { activeFormInput: 'url', urlToEval: 'realpython.com/python-basics/' },
        { activeFormInput: 'url', urlToEval: 'https://www.youtube.com/watch?v=ENrzD9HAZK4' },
        { activeFormInput: 'text', textToEval: 'asdasoidj asdoaisd assidioc' },
        { activeFormInput: 'text', textToEval: 'The design was awesome, I will recommend that company, very good service.' },
        { activeFormInput: 'url', urlToEval: 'https://onekindesign.com/2020/05/19/timber-frame-mountain-cabin/' }
    ];

    const successOutput = {
        polarity: expect.stringMatching(/positive|negative|neutral/),
        subjectivity: expect.stringMatching(/subjective|objective/)
    };

    const serverErrorOutput = '503 Server Error Connection Timeout';

    const clientErrorOutput = 'Error Not Valid URL Structure';

    it('[url-form]-[should retrieve polarity and subjectivity]', () => {
        expect.assertions(1);
        return formButtonClick(input[0], successOutput);
    });

    it('[text-form]-[should retrieve polarity and subjectivity]', () => {
        expect.assertions(1);
        return formButtonClick(input[1], successOutput);
    });

    it('[should throw Error Not Valid URL Structure]', () => {
        expect.assertions(1);
        return formButtonClick(input[2], clientErrorOutput);
    });

    it('[url-form]-[should throw 500 Internal Server Error]', () => {
        expect.assertions(1);
        return formButtonClick(input[3], serverErrorOutput);
    });

    it('[text-form]-[should throw 500 Internal Server Error]', () => {
        expect.assertions(1);
        return formButtonClick(input[4], serverErrorOutput);
    });

    it('[text-form]-[should retrieve polarity and subjectivity]', () => {
        expect.assertions(1);
        return formButtonClick(input[5], successOutput);
    });

    it('[url-form]-[should retrieve polarity and subjectivity]', () => {
        expect.assertions(1);
        return formButtonClick(input[6], successOutput);
    });

});