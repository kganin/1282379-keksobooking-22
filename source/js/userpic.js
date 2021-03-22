import { onFileUpload } from './util.js'

const defaultPreviewSrc = 'img/muffin-grey.svg';
const fileChooser = document.querySelector('input[name=avatar]');
const previewUserpic = document.querySelector('.ad-form-header__preview img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', onFileUpload(fileChooser, previewUserpic, FILE_TYPES));

export { defaultPreviewSrc, previewUserpic };
