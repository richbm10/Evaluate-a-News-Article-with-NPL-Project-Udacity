import "babel-polyfill";
// ServerServices for requesting external services
const dotenv = require('dotenv');
dotenv.config();


const AYLIENTextAPI = require('aylien_textapi');

const ServerServices = (function() {
    const maxTweet = 280;
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    aylienApi: '',
                    serviceData: {},
                    set: function(pAylienAppId, pAylienAppKey) {
                        this.aylienApi = new AYLIENTextAPI({
                            application_id: pAylienAppId,
                            application_key: pAylienAppKey
                        });
                    },
                    setSentimentAylienApiMode: function(content) {
                        if (content.length <= maxTweet) {
                            return 'tweet';
                        } else {
                            return 'document';
                        }
                    },
                    setSentimentAylienApiParam: function(type, message) {
                        return {
                            [type]: message.content,
                            'mode': this.setSentimentAylienApiMode(message.content)
                        };
                    },
                    getSentimentAylienApi: function(apiParam, resolve, reject) {
                        try {
                            this.aylienApi.sentiment(apiParam, (error, response) => {
                                if (error === null) {
                                    resolve(response);
                                } else {
                                    reject(error);
                                }
                            });
                        } catch (error) {
                            reject(error);
                        }
                    }
                };
            }
            return instance;
        }
    };
})();

const externalServices = ServerServices.getInstance();
externalServices.set(process.env.AYLIEN_API_ID, process.env.AYLIEN_API_KEY);

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

function requestAylienApiTest(type, requestBody, output) {
    const apiParam = externalServices.setSentimentAylienApiParam(type, requestBody);
    let message;

    externalServices.getSentimentAylienApi(apiParam, (externalResponse) => {
        message = successMessage(externalResponse);
        expect(message).toMatchObject(output);

    }, (error) => {
        message = errorMessage(error);
        expect(message).toMatchObject(output);
    });
}

describe("getSentimentAylienApi", () => {
    test("it should respond a success message with polarity and subjectivity for each of them", () => {
        // const input = [
        //     { type: 'url', content: 'https://codequickie.com/what-is-python-and-what-can-you-do-with-it/' },
        //     { type: 'text', content: 'I had a very good time in the restaurant, the service was really good.' },
        //     { type: 'url', content: 'https://rainforest.bonheurfitness.com/2020/03/31/10-coole-cafe-cafe-bestellideen-wa-081977713154/?_unique_id=5e82f98d2ea0e' },
        //     { type: 'text', content: 'That was the worst experience in my live, I am never going to come again to that cinema.' }
        // ];

        const input = [
            { type: 'url', content: 'I had a very good time in the restaurant, the service was really good.' }
        ];

        const output = {
            cod: 200,
            message: 'Success',
            content: {
                polarity: expect.stringMatching(/positive|negative|neutral /),
                subjectivity: expect.stringMatching(/subjective|objective/)
            }
        };

        for (let request of input) {
            requestAylienApiTest(request.type, request, output);
        }
    });
});