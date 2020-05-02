import { Services } from './modules/services';
import { activeFormInput } from './modules/combo-select';
// import { handleEvaluate } from './modules/form';

import './styles/pages/index.scss';

import dropDown from '../assets/icons/arrow_drop_down_circle-24px.svg';
import fact from '../assets/icons/fact.svg';
import negative from '../assets/icons/negative.svg';
import neutral from '../assets/icons/neutral.svg';
import opinion from '../assets/icons/opinion.svg';
import positive from '../assets/icons/positive.svg';
import question from '../assets/icons/question.svg';

const dropDownIcon = document.querySelector('#drop-down-icon');
dropDownIcon.src = dropDown;

const icons = {
    default: question,
    polarityIcons: [question, positive, neutral, negative],
    subjectivityIcons: [question, fact, opinion]
};

const polarityIcon = document.querySelector('#polarity-icon');
polarityIcon.data = icons.default;

const subjectivityIcon = document.querySelector('#subjectivity-icon');
subjectivityIcon.data = icons.default;

export { Services, activeFormInput };