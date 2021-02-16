import {TYPES} from './data.js';

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

const adList = document.querySelector('.map__canvas');
const adTemplate = document.querySelector('#card').content.querySelector('.popup');
const ad = adTemplate.cloneNode(true);

const photosContainer = ad.querySelector('.popup__photos');
const featuresContainer = ad.querySelector('.popup__features');

const getWordForm = (num, wordForms) => {
  if (num > 1 && num < 5) return wordForms[1];
  if (num == 1) return wordForms[0];
  return wordForms[2];
};

const getPhotos = (container, photos) => {
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin',photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('\n'));
};

const getFeatures = (container, features) => {
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('\n'));
};

export const renderAd = (adData) => {
  ad.querySelector('.popup__avatar').src = adData.author.avatar;
  ad.querySelector('.popup__title').textContent = adData.offer.title;
  ad.querySelector('.popup__text--address').textContent = adData.offer.address;
  ad.querySelector('.popup__text--price').innerHTML = `${adData.offer.price} <span>₽/ночь</span>`;
  ad.querySelector('.popup__type').textContent = TYPES[adData.offer.type];
  ad.querySelector('.popup__text--capacity').textContent = `${adData.offer.rooms} ${getWordForm(adData.offer.rooms, ROOMS_WORD_FORMS)} для ${adData.offer.guests} ${getWordForm(adData.offer.guests, GUESTS_WORD_FORMS)}`;
  ad.querySelector('.popup__text--time').textContent = `Заезд после ${adData.offer.checkin}, выезд до ${adData.offer.checkout}`;
  ad.querySelector('.popup__description').textContent = adData.offer.description;
  getPhotos(photosContainer, adData.offer.photos);
  getFeatures(featuresContainer, adData.offer.features);
  adList.appendChild(ad);
};
