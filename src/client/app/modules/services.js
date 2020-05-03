//Services
const Services = (function() {
    let instance;
    return {
        getInstance: () => {
            if (!instance) {
                instance = {
                    baseLocalServerURL: '',
                    serviceData: {},
                    set: function(pBaseLocalServerURL) {
                        this.baseLocalServerURL = pBaseLocalServerURL;
                    },
                    setHttpRequest: function(httpMethod, httpBodyData) {
                        return {
                            method: httpMethod,
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(httpBodyData)
                        };
                    },
                    postRequestLocalServer: async function(query, data = {}) {
                        const response = await fetch(this.baseLocalServerURL + query, this.setHttpRequest('POST', data));
                        try {
                            const resData = await response.json();
                            return resData;
                        } catch (error) {
                            console.log("error", error);
                        }
                    },
                    queryNlpText: '/nlp/evaltext',
                    queryNlpUrl: '/nlp/evalurl',
                    handleResponse: function(response, callBack) {
                        console.log(response);
                        response.cod = `${response.cod}`;
                        switch (true) {
                            case response.cod >= '200' && response.cod < '300':
                                if ('content' in response) {
                                    this.serviceData = content;
                                }
                                callBack();
                                break;
                            case response.cod >= '400' && response.cod < '600':
                                throw `${response.cod} ${response.message}`;
                            default:
                                break;
                        }
                    }
                };
            }
            return instance;
        }
    };
})();

export { Services };