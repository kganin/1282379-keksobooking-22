import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import debounce from 'lodash/debounce';

import { renderNewAd } from './ad.js';
import { disableForm, enableForm, fillAddressField, initAdForm } from './form.js';
import { getData, SERVER_GET } from './backend.js'
import { showPopup } from './popup.js';
import { getFilteredAdsData, onFilterChange } from './filter.js';

const START_ZOOM = 9;
const START_LOCATION =  {
  lat:  35.68040,
  lng: 139.76900,
};

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [20, 40];

const RERENDER_DELAY = 500;
const MAX_ADS_COUNT = 10;

let pins = [];

disableForm();

const map = L.map('map-canvas')
  .on('load', enableForm)
  .setView(START_LOCATION, START_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  })
  .addTo(map);

const mainPin = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const onPinMove = () => {
  const currentLocation = mainMarker.getLatLng();
  fillAddressField(currentLocation);
};

const mainMarker = L.marker(START_LOCATION, {
  icon: mainPin,
  draggable: true,
  autoPan: true,
  autoPanPadding: [50, 50],
})
  .addTo(map)
  .setZIndexOffset(100)
  .on('move', onPinMove);

initAdForm();

const clearMap = () => {
  pins.forEach((pin) => pin.remove())
};

const renderPins = (adsData) => {
  adsData
    .slice(0, MAX_ADS_COUNT)
    .filter(getFilteredAdsData)
    .forEach((adData) => {
      const pinIcon = L.icon({
        iconUrl: '/img/pin.svg',
        iconSize: PIN_SIZE,
        iconAnchor: PIN_ANCHOR,
      });

      const pin = L.marker(Object.values(adData.location), {
        icon: pinIcon,
      })
        .addTo(map)
        .bindPopup(renderNewAd(adData), {
          keepInView: true,
        });
      pins.push(pin);
    });
}

const renderFilteredPins = (adsData) => {
  return () => {
    clearMap();
    renderPins(adsData);
  }
};

getData(SERVER_GET,
  (adsData) => {
    renderPins(adsData)
    onFilterChange(debounce(renderFilteredPins(adsData), RERENDER_DELAY))
  }, showPopup);

export { map, START_LOCATION, START_ZOOM, mainMarker, clearMap, renderPins, renderFilteredPins, RERENDER_DELAY };
