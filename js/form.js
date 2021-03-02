import { ACCOMODATION_TYPES } from './data.js'
import { START_LOCATION } from './map.js';

const adForm = document.querySelector('.ad-form');
const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const hoursBlock = adForm.querySelector('.ad-form__element--time');
const formFields = adForm.querySelectorAll('fieldset');
const addressField = adForm.querySelector('#address');
const mapFeatureFields = adForm.querySelectorAll('.map__feature');
const titleField = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const guestNumber = adForm.querySelector('#capacity');

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_PER_NIGHT = 1000000;

const capacity = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

const onRoomNumberChange = () => {
  Object.values(guestNumber.children).forEach((option) => option.disabled = true);
  capacity[roomNumber.value].forEach((elem) => {
    Object.values(guestNumber.children).forEach((option) => {
      if (elem === Number(option.value)) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
}

const onTypeFieldChange = () => {
  priceField.placeholder = ACCOMODATION_TYPES[typeField.value]['minPrice'];
  priceField.min = ACCOMODATION_TYPES[typeField.value]['minPrice'];
}

const onPriceFieldInput = () => {
  if (priceField.value < ACCOMODATION_TYPES[typeField.value]['minPrice']) {
    priceField.setCustomValidity(`Минимальная стоимость - ${ACCOMODATION_TYPES[typeField.value]['minPrice']} руб.`)
  }
  else if (priceField.value > MAX_PRICE_PER_NIGHT) {
    priceField.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE_PER_NIGHT} руб.`)
  }
  else {
    priceField.setCustomValidity('');
  }
  priceField.reportValidity();
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

const fillAddressField = (coordinates) => {
  if (!(adForm.classList.contains('ad-form--disabled'))) {
    return addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
  }
}

const enableForm = () => {
  onRoomNumberChange();
  formFields.forEach((field) => {
    field.disabled = false;
    field.classList.remove('disabled');
  });
  mapFeatureFields.forEach((field) => field.classList.remove('map__feature--disabled'));
  adForm.classList.remove('ad-form--disabled');
  addressField.value = fillAddressField(START_LOCATION);
}

const onTitleFieldInput = () => {
  const valueLength = titleField.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleField.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
  } else {
    titleField.setCustomValidity('');
  }
  titleField.reportValidity();
};

hoursBlock.addEventListener('change', onSelectChange);
typeField.addEventListener('change', onTypeFieldChange);
roomNumber.addEventListener('change', onRoomNumberChange);
titleField.addEventListener('input', onTitleFieldInput);
priceField.addEventListener('input', onPriceFieldInput);

export { fillAddressField, enableForm, disableForm };
