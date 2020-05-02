document.querySelector('#form-button').addEventListener('click', () => {
    const form = document.querySelector('#form');
    const inputToEval = form.inputToEval.value;
    console.log(inputToEval);
});