import { errorPopup } from './popup.js';

const SERVER_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const SERVER_POST = 'https://22.javascript.pages.academy/keksobooking';

const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response) => response.ok ? response.json() : onFail(errorPopup, `Не удалось получить данные. Ошибка ${response.status}.`))
    .then(((pins) => onSuccess(pins)))
    .catch(() => onFail(errorPopup, 'Не удалось получить данные. Сервер не отвечает.'))
};

const sendData = (url, onSuccess, onFail, formData) => {
  fetch(
    url,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => response.ok ? onSuccess() : onFail(`Не удалось отправить форму. Ошибка ${response.status}. Попробуйте ещё раз`))
    .catch(() => onFail('Не удалось отправить форму. Попробуйте ещё раз'))
};

export { getData, sendData, SERVER_GET, SERVER_POST }
