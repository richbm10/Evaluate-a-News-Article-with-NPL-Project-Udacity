//Services

const AYLIENTextAPI = require('aylien_textapi');

const ServerServices = (function() {
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
                    setSentimentAylienApiParam: function(type, mode, message) {
                        return {
                            [type]: message.content,
                            'mode': mode
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