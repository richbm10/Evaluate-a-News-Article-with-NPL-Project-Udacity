const selected = document.querySelector('#selected');
const options = document.querySelector('#options');

const activateOptions = () => {
    options.classList.toggle('active-options');
};

document.querySelector('#selected').addEventListener('click', activateOptions);

document.querySelector('#drop-down-icon').addEventListener('click', activateOptions);

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        selected.textContent = option.querySelector('label').textContent;
        options.classList.remove('active-options');
    });
});