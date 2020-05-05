function validateUrl(value) { //taken from https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function submit(query, inputToEval) {
    Client.services.postRequestLocalServer(query, { 'content': inputToEval }).then((response) => {
        try {
            Client.services.handleResponse(response, Client.setPageData);
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
        query = Client.services.queryNlpUrl;
        if (validateUrl(inputToEval)) {
            submit(query, inputToEval);
        } else {
            alert('Error Not Valid URL Structure');
        }
    } else if (activeFormInput === 'text') {
        inputToEval = form.textToEval.value;
        query = Client.services.queryNlpText;
        submit(query, inputToEval);
    }
});