'use strict';

const getRandomInt = function(min, max) {
  if (min < 0 || min > max) {
    return null
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
getRandomInt();

const getRandomFloat = function(min, max, decimal = 7) {
  if (min < 0 || min > max) {
    return null
  }
  const randomNumber = Math.random() * (max - min) + min;
  return Number(randomNumber.toFixed(decimal));
}
getRandomFloat();
