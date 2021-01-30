'use strict';

let getRandomInt = function(min, max) {
  if (min < 0 || max < 0 || min >= max) {
    return 'Ошибка!!!'
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
getRandomInt();

let getCoord = function(min, max, decimal = 7) {
  if (min < 0 || max < 0 || min >= max) {
    return 'Ошибка!!!'
  }
  let randomNum = Math.random() * (max - min) + min;
  return Number(randomNum.toFixed(decimal));
}
getCoord();
