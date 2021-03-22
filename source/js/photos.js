import { onFileUpload } from './util.js'

const fileChooser = document.querySelector('input[name=images]');
const previewPhoto = document.querySelector('.ad-form__photo').appendChild(document.createElement('img'));
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', onFileUpload(fileChooser, previewPhoto, FILE_TYPES));

export { previewPhoto };
