function handleEvaluate() {
    const form = document.querySelector('#form');
    const activeFormInput = Client.activeFormInput;
    let inputToEval;
    if (activeFormInput === 'url') {
        inputToEval = form.urlToEval.value;
    } else if (activeFormInput === 'text') {
        inputToEval = form.textToEval.value;
    }
    console.log(inputToEval);
}

document.querySelector('#form-button').addEventListener('click', () => { handleEvaluate() });

export { handleEvaluate };