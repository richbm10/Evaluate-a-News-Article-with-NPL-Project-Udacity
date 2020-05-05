const { index, externalServices } = require('../src/server/index');

function requestAylienApi(type, requestBody) {
    const apiParam = externalServices.setSentimentAylienApiParam(type, requestBody);

    externalServices.getSentimentAylienApi(apiParam, (externalResponse) => {
        message = index.successMessage(externalResponse);

    }, (error) => {
        message = index.errorMessage(error);
    });
}

describe("getSentimentAylienApi by url", () => {
    test("it should respond with polarity and subjectivity for each of them", () => {
        const input = [
            { type: 'url', content: 'https://codequickie.com/what-is-python-and-what-can-you-do-with-it/' },
            { type: 'text', content: 'I had a very good time in the restaurant, the service was really good.' },
            { type: 'url', content: 'https://rainforest.bonheurfitness.com/2020/03/31/10-coole-cafe-cafe-bestellideen-wa-081977713154/?_unique_id=5e82f98d2ea0e' },
            { type: 'text', content: 'That was the worst experience in my live, I am never going to come again to that cinema.' }
        ];

        const output = {
            polarity: expect.stringMatching(/positive|negative|neutral /),
            subjectivity: expect.stringMatching(/subjective|objective/)
        };

        for (let request of input) {
            expect(requestAylienApi(request.type, request.content)).toMatchObject(output);
        }
    });
});