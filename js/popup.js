import {getSimilarAds, TYPES} from './data.js';

const popupList = document.querySelector('.map__canvas');

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarCards = getSimilarAds();

similarCards.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos}}) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = avatar;
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = TYPES[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнат${getWordEnding(rooms, ['a','ы',''])} для ${guests}${getWordEnding(guests,['-го','-х', '-и'])} гост${getWordEnding(guests,['я','ей', 'ей'])}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__description').textContent = description;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', features.map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join(''));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', photos.map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`).join(''));
  popupList.appendChild(cardElement);
});

function getWordEnding(number, endingForms) {
  if (number > 100) number = number % 100;
  if (number <= 20 && number >= 10) return endingForms[2];
  if (number > 20) number = number % 10;
  return number === 1 ? endingForms[0] : number > 1 && number < 5 ? endingForms[1] : endingForms[2];
}



