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
                    getSentimentAylienApi: function(type, mode, message) {
                        try {
                            let res;
                            await this.aylienApi.sentiment({
                                [type]: message.content,
                                'mode': mode
                            }, (error, response) => {
                                if (error === null) {
                                    res = response;
                                } else {
                                    throw error;
                                }
                            });
                            return res;
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