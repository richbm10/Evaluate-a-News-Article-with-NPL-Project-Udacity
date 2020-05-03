import { Services } from './modules/services';
import { activeFormInput } from './modules/combo-select';
import './modules/form';

import './styles/pages/index.scss';

import dropDown from '../assets/icons/arrow_drop_down_circle-24px.svg';
import objective from '../assets/icons/fact.svg';
import negative from '../assets/icons/negative.svg';
import neutral from '../assets/icons/neutral.svg';
import subjective from '../assets/icons/opinion.svg';
import positive from '../assets/icons/positive.svg';
import question from '../assets/icons/question.svg';

const dropDownIcon = document.querySelector('#drop-down-icon');
dropDownIcon.src = dropDown;

const icons = {
    default: question,
    polarityIcons: { positive, neutral, negative },
    subjectivityIcons: { objective, subjective }
};

const polarityIcon = document.querySelector('#polarity-icon');
polarityIcon.data = icons.default;

const subjectivityIcon = document.querySelector('#subjectivity-icon');
subjectivityIcon.data = icons.default;

function setPolarityIcon(polarityIcon) {
    const polarity = Client.Services.serviceData.polarity;
    console.log(polarity);
    polarityIcon.data = icons.polarityIcons[polarity];
}

function setSubjectivityIcon(subjectivityIcon) {
    const subjectivity = Client.Services.serviceData.subjectivity;
    console.log(subjectivity);
    subjectivityIcon.data = icons.subjectivityIcons[subjectivity];
}

const services = Services.getInstance();
services.set('a44a01f0', '27308ad3bbef8950fc2482fbe1cfc4d1');

const setPageData = () => {
    setPolarityIcon(polarityIcon);
    setSubjectivityIcon(subjectivityIcon);
};

export { Services, activeFormInput, setPageData };