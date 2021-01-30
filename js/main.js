'use strict';

let getRandomInt = function(min, max) {
  if (min >= 0 && max >= 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  return 'Ошибка!!!Диапазон может быть только положительный.';
}
getRandomInt();

let getCoord = function(min, max, decimal = 7) {
  if (min >= 0 && max >= 0) {
    let randomNum = Math.random() * (max - min) + min;
    return Number(randomNum.toFixed(decimal));
  }
  return 'Ошибка!!!Диапазон может быть только положительный.';
}
getCoord();
