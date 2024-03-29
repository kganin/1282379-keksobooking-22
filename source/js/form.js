import { START_LOCATION, START_ZOOM, mainMarker, map, clearMap, renderPins } from './map.js';
import { sendData, SERVER_POST, SERVER_GET, getData } from './backend.js'
import { errorPopup, successPopup, showPopup } from './popup.js';
import { setDefaultPreview } from './util.js';
import { defaultPreviewSrc, previewUserpic } from './userpic.js';
import { previewPhoto } from './photos.js';

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_PER_NIGHT = 1000000;

const DECIMAL_COUNT = 5;

const capacity = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

const ACCOMODATION_TYPES = {
  palace: {
    type: 'Дворец',
    minPrice: 10000,
  },
  flat: {
    type: 'Квартира',
    minPrice: 1000,
  },
  house: {
    type: 'Дом',
    minPrice: 5000,
  },
  bungalow: {
    type: 'Бунгало',
    minPrice: 0,
  },
};

const adForm = document.querySelector('.ad-form');
const adFormFields = adForm.querySelectorAll('fieldset');
const adFormCheckboxes = adForm.querySelectorAll('.feature__checkbox');

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFields = mapFiltersForm.querySelectorAll('fieldset');
const mapFiltersCheckboxes = mapFiltersForm.querySelectorAll('.map__checkbox');
const mapFeaturesFields = mapFiltersForm.querySelectorAll('.map__feature');

const priceField = adForm.querySelector('#price');
const priceFieldset =  adForm.querySelector('fieldset:nth-child(5)');
const typeField = adForm.querySelector('#type');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const hoursBlock = adForm.querySelector('.ad-form__element--time');
const addressField = adForm.querySelector('#address');
const titleField = adForm.querySelector('#title');
const titleFieldset =  adForm.querySelector('fieldset:nth-child(2)');
const roomNumberField = adForm.querySelector('#room_number');
const guestNumberField = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

const onTitleFieldInput = () => {
  const valueLength = titleField.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    titleField.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) +' симв.');
    titleFieldset.classList.add('ad-form__element--error');
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleField.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) +' симв.');
    titleFieldset.classList.add('ad-form__element--error');
  } else {
    titleField.setCustomValidity('');
    titleFieldset.classList.remove('ad-form__element--error');
  }
  titleField.reportValidity();
};

const setAccomodationPrice = () => {
  priceField.placeholder = ACCOMODATION_TYPES[typeField.value]['minPrice'];
  priceField.min = ACCOMODATION_TYPES[typeField.value]['minPrice'];
};

const onPriceFieldInput = () => {
  if (priceField.value < ACCOMODATION_TYPES[typeField.value]['minPrice']) {
    priceField.setCustomValidity(`Минимальная стоимость - ${ACCOMODATION_TYPES[typeField.value]['minPrice']} руб.`);
    priceFieldset.classList.add('ad-form__element--error');
  }
  else if (priceField.value > MAX_PRICE_PER_NIGHT) {
    priceField.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE_PER_NIGHT} руб.`);
    priceFieldset.classList.add('ad-form__element--error');
  }
  else {
    priceField.setCustomValidity('');
    priceFieldset.classList.remove('ad-form__element--error');
  }
  priceField.reportValidity();
}

const initRoomNumberField = () => {
  Object.values(guestNumberField.children).forEach((option) => {
    if (capacity[roomNumberField.value].includes(Number(option.value))) {
      option.disabled = false;
      option.selected = true;
    } else {
      option.disabled = true;
    }
  });
}

const onRoomNumberFieldChange = () => initRoomNumberField();
const onAccomodationFieldChange = () => setAccomodationPrice();

const onHoursBlockChange = (evt) => {
  timeInField.value = evt.target.value;
  timeOutField.value = evt.target.value;
};

const fillAddressField = (coordinates) => {
  if (!(adForm.classList.contains('ad-form--disabled'))) {
    return addressField.value = `${coordinates.lat.toFixed(DECIMAL_COUNT)}, ${coordinates.lng.toFixed(DECIMAL_COUNT)}`;
  }
};

const resetCheckboxes = (checkbxoxes) => {
  checkbxoxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

const disableFields = (fields) => {
  fields.forEach((field) => {
    field.disabled = true;
    field.classList.add('disabled');
  });
};

const enableFields = (fields) => {
  fields.forEach((field) => {
    field.disabled = false;
    field.classList.remove('disabled');
  });
};

const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFeaturesFields.forEach((field) => field.classList.add('map__feature--disabled'));
  disableFields(adFormFields);
  disableFields(mapFiltersFields);
};

const enableForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFeaturesFields.forEach((field) => field.classList.remove('map__feature--disabled'));
  enableFields(adFormFields);
  enableFields(mapFiltersFields);
};

const initAdForm = () => {
  initRoomNumberField();
  mainMarker.setLatLng(START_LOCATION);
  map.setView(START_LOCATION, START_ZOOM);
  fillAddressField(mainMarker.getLatLng());
};

const resetForms = () => {
  adForm.reset();
  mapFiltersForm.reset();
  setAccomodationPrice();
  resetCheckboxes(adFormCheckboxes);
  resetCheckboxes(mapFiltersCheckboxes);
  setDefaultPreview(previewUserpic, defaultPreviewSrc);
  setDefaultPreview(previewPhoto, defaultPreviewSrc);
  clearMap();
  getData(SERVER_GET,
    (adsData) => {
      renderPins(adsData);
    }, showPopup);
};

const setUserFormSubmit = (onSubmit) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      SERVER_POST,
      () => {
        onSubmit(successPopup, 'Форма отправлена!');
        resetForms();
        initAdForm();
      },
      (message) => onSubmit(errorPopup, message),
      new FormData(evt.target),
    );
  });
};

hoursBlock.addEventListener('change', onHoursBlockChange);
typeField.addEventListener('change', onAccomodationFieldChange);
roomNumberField.addEventListener('change', onRoomNumberFieldChange);
titleField.addEventListener('input', onTitleFieldInput);
priceField.addEventListener('input', onPriceFieldInput);
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
  initAdForm();
})

export { fillAddressField, enableForm, initAdForm, disableForm, ACCOMODATION_TYPES, setUserFormSubmit, mapFiltersForm, resetButton, resetForms };
