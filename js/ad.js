import { ACCOMODATION_TYPES } from './form.js';

const GUESTS_WORD_FORMS = [
  'гостя',
  'гостей',
  'гостей',
];
const ROOMS_WORD_FORMS = [
  'комната',
  'комнаты',
  'комнат',
];

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const getWordForm = (num, wordForms) => {
  if (num > 1 && num < 5) return wordForms[1];
  if (num == 1) return wordForms[0];
  return wordForms[2];
};

const getPhotos = (container, photos) => {
  if (photos.length === 0) {
    return container.remove();
  }
  container.innerHTML = photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('\n');
};

const getFeatures = (container, features) => {
  if (features.length === 0) {
    return container.remove();
  }
  container.innerHTML = features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('\n');
};

const renderNewAd = (adData) => {
  const newAd = adTemplate.cloneNode(true);
  newAd.querySelector('.popup__avatar').src = adData.author.avatar;
  newAd.querySelector('.popup__title').textContent = adData.offer.title;
  newAd.querySelector('.popup__text--address').textContent = adData.offer.address;
  newAd.querySelector('.popup__text--price').innerHTML = `${adData.offer.price} <span>₽/ночь</span>`;
  newAd.querySelector('.popup__type').textContent = ACCOMODATION_TYPES[adData.offer.type]['type'];
  newAd.querySelector('.popup__text--capacity').textContent = `${adData.offer.rooms} ${getWordForm(adData.offer.rooms, ROOMS_WORD_FORMS)} для ${adData.offer.guests} ${getWordForm(adData.offer.guests, GUESTS_WORD_FORMS)}`;
  newAd.querySelector('.popup__text--time').textContent = `Заезд после ${adData.offer.checkin}, выезд до ${adData.offer.checkout}`;
  newAd.querySelector('.popup__description').textContent = adData.offer.description;
  getPhotos(newAd.querySelector('.popup__photos'), adData.offer.photos);
  getFeatures(newAd.querySelector('.popup__features'), adData.offer.features);
  return newAd;
};

export { renderNewAd };
