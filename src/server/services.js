//Services

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
                    getSentimentAylienApi: async function(apiParam, resolve, reject) {
                        this.aylienApi.sentiment(apiParam, (error, response) => {
                            if (error === null) {
                                resolve(response);
                            } else {
                                reject(error);
                            }
                        });
                    }
                };
            }
            return instance;
        }
    };
})();

exports.ServerServices = ServerServices;