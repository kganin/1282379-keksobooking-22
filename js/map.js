/* global L:readonly */
import { adsData } from './data.js';
import { renderNewAd } from './ad.js';
import { enableForm, fillAddressField } from './form.js';

export const START_LOCATION =  {
  lat:  35.68643,
  lng: 139.70627,
};

export const map = L.map('map-canvas')
  .on('load', enableForm)
  .setView(START_LOCATION, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
)
  .addTo(map);

const mainPin = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const onPinDrag = () => {
  const currentLocation = mainMarker.getLatLng();
  fillAddressField(currentLocation);
};

const mainMarker = L.marker(START_LOCATION, {icon: mainPin, draggable: true})
  .on('dragend', onPinDrag)
  .addTo(map);

const getPins = (adsData) => {
  adsData.forEach((adData) => {
    const pin = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    L.marker(Object.values(adData.location), {icon: pin}).addTo(map)
      .bindPopup(renderNewAd(adData), {keepInView: true});
  });
}

getPins(adsData);

