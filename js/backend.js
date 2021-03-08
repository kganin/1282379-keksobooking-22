import { errorPopup } from './popup.js';

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.ok ? response.json() : onFail(errorPopup, `Не удалось получить данные. Ошибка ${response.status}.`))
    .then(((pins) => onSuccess(pins)))
    .catch(() => onFail(errorPopup, 'Не удалось получить данные. Сервер не отвечает.'))
};

const sendData = (onSuccess, onFail, formData) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail(`Не удалось отправить форму. Ошибка ${response.status}. Попробуйте ещё раз`))
    .catch(() => onFail('Не удалось отправить форму. Попробуйте ещё раз'))
};

export { getData, sendData }
