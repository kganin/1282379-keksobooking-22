import { getRandomInt, getRandomFloat, getRandomArray, getRandomArrayElement } from './util.js';
import { FEATURES, TITLES, TYPES, HOURS, DESCRIPTIONS, PHOTOS } from './data.js';

const SIMILAR_ADS_COUNT = 10;

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

const similarAds = () => new Array(SIMILAR_ADS_COUNT).fill(null).map(createAd);
similarAds();
