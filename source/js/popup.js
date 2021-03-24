import { isEscEvent, isEnterEvent } from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');

let onPopupClick;
let onPopupEscKeydown;
let onErrorButtonClick;

const showPopup = (popupContainer, message) => {
  document.body.append(popupContainer);
  popupContainer.querySelector('p').textContent = message;
  onPopupClick = createOnPopupClick(popupContainer);
  onPopupEscKeydown = createOnPopupEscKeydown(popupContainer);
  onErrorButtonClick = createOnErrorButtonClick(popupContainer);
  popupContainer.addEventListener('click', onPopupClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  if (popupContainer.contains(errorButton)) {
    errorButton.addEventListener('keydown', onErrorButtonClick);
  }
};

const closePopup = (popupContainer) => {
  popupContainer.remove();
  popupContainer.removeEventListener('click', onPopupClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const createOnErrorButtonClick = (popupContainer) => {
  return (evt) => {
    if (isEnterEvent(evt)) {
      evt.preventDefault();
      closePopup(popupContainer);
      errorButton.removeEventListener('keydown', onErrorButtonClick);
    }
  }
};

const createOnPopupClick = (popupContainer) => () => closePopup(popupContainer);

const createOnPopupEscKeydown = (popupContainer) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopup(popupContainer);
    }
  }
};

export { showPopup, successPopup, errorPopup };
