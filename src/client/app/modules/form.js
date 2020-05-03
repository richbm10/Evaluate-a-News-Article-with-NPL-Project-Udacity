function submit(query, inputToEval) {
    Client.services.postRequestLocalServer(query, { 'content': inputToEval }).then((response) => {
        // try {
        //     Client.services.handleResponse(response, Client.setPageData);
        // } catch (error) {
        //     alert(error);
        // }
        Client.services.handleResponse(response, Client.setPageData);
    }).catch(() => {
        alert('503 Server Error Connection');
    });
}

document.querySelector('#form-button').addEventListener('click', () => {
    const form = document.querySelector('#form');
    const activeFormInput = Client.activeFormInput;
    let query;
    let inputToEval;
    if (activeFormInput === 'url') {
        inputToEval = form.urlToEval.value;
        query = Client.services.queryNlpUrl;
    } else if (activeFormInput === 'text') {
        inputToEval = form.textToEval.value;
        query = Client.services.queryNlpText;
    }
    submit(query, inputToEval);
});