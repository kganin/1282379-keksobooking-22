/* global L:readonly */
import { adsData } from './data.js';
import { renderNewAd } from './ad.js';
import { enableForm, fillAddressField } from './form.js';

const START_ZOOM = 12;
const START_LOCATION =  {
  lat:  35.68643,
  lng: 139.70627,
};

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [20, 40];


const map = L.map('map-canvas')
  .on('load', enableForm)
  .setView(START_LOCATION, START_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
)
  .addTo(map);

const mainPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const onPinDrag = () => {
  const currentLocation = mainMarker.getLatLng();
  fillAddressField(currentLocation);
};

const mainMarker = L.marker(START_LOCATION, {icon: mainPin, draggable: true})
  .on('move', onPinDrag)
  .addTo(map);

const getPins = (adsData) => {
  adsData.forEach((adData) => {
    const pin = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: PIN_SIZE,
      iconAnchor: PIN_ANCHOR,
    });
    L.marker(Object.values(adData.location), {icon: pin}).addTo(map)
      .bindPopup(renderNewAd(adData), {keepInView: true});
  });
}

getPins(adsData);

export { map, START_LOCATION };
