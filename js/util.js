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

const shuffleArray = (elements) => {
  const clonedElements = elements.slice(0);
  for (let i = clonedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = swap;
  }
  return clonedElements;
}

const getRandomArray = (elements) => shuffleArray(elements).slice(getRandomInt(0, elements.length));

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export { getRandomInt, getRandomFloat, getRandomArray, getRandomArrayElement };
