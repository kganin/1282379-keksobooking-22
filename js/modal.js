import {ACCOMODATION_TYPES} from './data.js'

const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const hoursBlock = document.querySelector('.ad-form__element--time');

const onTypeFieldChange = () => {
  const currentType = ACCOMODATION_TYPES[typeField.value]['minPrice'];
  priceField.setAttribute('placeholder', currentType);
  priceField.setAttribute('min', currentType);
}

const onSelectChange = (evt) => {
  timeInField.value = evt.target.value;
  timeOutField.value = evt.target.value;
}

hoursBlock.addEventListener('change', onSelectChange);
typeField.addEventListener('change', onTypeFieldChange)
