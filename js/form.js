import { ACCOMODATION_TYPES } from './data.js'
import { START_LOCATION } from './map.js';

const priceField = document.querySelector('#price');
const typeField = document.querySelector('#type');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const hoursBlock = document.querySelector('.ad-form__element--time');
const adForm = document.querySelector('.ad-form');
export const formFields = document.querySelectorAll('fieldset');
const addressField = document.querySelector('#address');
const mapFeatureFields = document.querySelectorAll('.map__feature');

const onTypeFieldChange = () => {
  priceField.placeholder = ACCOMODATION_TYPES[typeField.value]['minPrice'];
  priceField.min = ACCOMODATION_TYPES[typeField.value]['minPrice'];
}

const onSelectChange = (evt) => {
  timeInField.value = evt.target.value;
  timeOutField.value = evt.target.value;
}

const disableForm = () => {
  formFields.forEach((field) => {
    field.disabled = true;
    field.classList.add('disabled');
  })
  mapFeatureFields.forEach((field) => field.classList.add('map__feature--disabled'));
  adForm.classList.add('ad-form--disabled');
}

disableForm();

export const fillAddressField = (coordinates) => {
  if (!(adForm.classList.contains('ad-form--disabled'))) {
    return addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  }
}

export const enableForm = () => {
  formFields.forEach((field) => {
    field.disabled = false;
    field.classList.remove('disabled');
  })
  mapFeatureFields.forEach((field) => field.classList.remove('map__feature--disabled'));
  adForm.classList.remove('ad-form--disabled');
  addressField.value = fillAddressField(START_LOCATION);
}

hoursBlock.addEventListener('change', onSelectChange);
typeField.addEventListener('change', onTypeFieldChange);
