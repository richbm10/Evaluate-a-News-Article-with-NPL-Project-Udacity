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
                    getSentimentAylienApi: async function(type, mode, message) {
                        try {
                            this.aylienApi.sentiment({
                                [type]: message.content,
                                'mode': mode
                            }, (error, response) => {
                                if (error === null) {
                                    console.log(response);
                                    return response;
                                } else {
                                    throw error;
                                }
                            });
                        } catch (error) {
                            throw 'Error Not Valid Request';
                        }
                    }
                };
            }
            return instance;
        }
    };
})();

exports.ServerServices = ServerServices;