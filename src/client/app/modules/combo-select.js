let activeFormInput = 'url';

function swapBaseContent(selectedOption) {
    if (selectedOption === 'textEval') {
        document.querySelector('#form-txt-area').style.display = 'block';
        document.querySelector('#form-input').style.display = 'none';
        document.querySelector('#form').urlToEval.value = '';
        activeFormInput = 'text';
    } else if (selectedOption === 'urlEval') {
        document.querySelector('#form-input').style.display = 'block';
        document.querySelector('#form-txt-area').style.display = 'none';
        document.querySelector('#form').textToEval.value = '';
        activeFormInput = 'url';
    }
}

const activateOptions = () => {
    document.querySelector('#options').classList.toggle('active-options');
};

document.querySelector('#selected').addEventListener('click', activateOptions);

document.querySelector('#drop-down-icon').addEventListener('click', activateOptions);

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelector('#selected').textContent = option.querySelector('label').textContent;
        document.querySelector('#options').classList.remove('active-options');
        swapBaseContent(option.querySelector('input').name);
    });
});

export { activeFormInput };