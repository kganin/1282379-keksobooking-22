'use strict';

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

const TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const HOURS = ['12:00', '13:00', '14:00'];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const DESCRIPTIONS = [
  'Невероятный дворец с аквадискотекой и театром',
  'Светлая и просторная квартира с видом на набережную',
  'Небольшой загородный домик в скандинавском стиле',
  'Уютная студия в центре города со всем необходимым',
];

const SIMILAR_ADS_COUNT = 10;

const getRandomInt = (min, max) => {
  if (min < 0 || min > max) {
    throw new Error('Задан неверный диапазон');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloat = (min, max, decimal = 5) => {
  if (min < 0 || min > max) {
    throw new Error('Задан неверный диапазон');
  }
  const randomNumber = Math.random() * (max - min) + min;
  return Number(randomNumber.toFixed(decimal));
}

const shuffleArray = elements => {
  const clonedElements = elements.slice(0);
  for (let i = clonedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = swap;
  }
  return clonedElements;
}

const getRandomArray = elements => shuffleArray(elements).slice(getRandomInt(0, elements.length - 1));

const getRandomArrayElement = elements => elements[getRandomInt(0, elements.length - 1)];

const createAd = () => {
  const X = getRandomFloat(35.65000, 35.70000);
  const Y = getRandomFloat(139.70000, 139.80000);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInt(1, 8)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${X}, ${Y}`,
      price: getRandomInt(1500, 7000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, 5),
      guests: getRandomInt(1, 7),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: X,
      y: Y,
    },
  }
};

const similarAds = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAd());
similarAds;
