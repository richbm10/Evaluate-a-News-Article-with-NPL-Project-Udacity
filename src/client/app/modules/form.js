function submit(query, inputToEval) {
    Client.Services.postRequestLocalServer(query, { 'content': inputToEval }).then((response) => {
        try {
            Client.Services.handleResponse(response, Client.setPageData);
        } catch (error) {
            alert(error);
        }
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
        query = Client.Services.queryNlpUrl;
    } else if (activeFormInput === 'text') {
        inputToEval = form.textToEval.value;
        query = Client.Services.queryNlpText;
    }
    submit(query, inputToEval);
});