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
            //expect(error).toMatchObject(expectedOutput);
        }
    }).catch(() => {
        expect('503 Server Error Connection').toMatch(expectedOutput);
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


describe("submit form", () => {
    const input = [
        // { activeFormInput: 'url', urlToEval: 'https://codequickie.com/what-is-python-and-what-can-you-do-with-it/' },
        { activeFormInput: 'text', textToEval: 'I had a very good time in the restaurant, the service was really good.' }
    ];

    const output = {
        cod: 200,
        message: 'Success',
        content: {
            polarity: expect.stringMatching(/positive|negative|neutral/),
            subjectivity: expect.stringMatching(/subjective|objective/)
        }
    };

    it('should respond a success message with polarity and subjectivity', () => {
        expect.assertions(1);
        return formButtonClick(input[0], output);
    });
});