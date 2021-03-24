import { mapFiltersForm } from './form.js'

const filterAccomodation = (adData) => {
  const accomodation = mapFiltersForm.querySelector('#housing-type').value;
  return 'any' === accomodation || adData.offer.type === accomodation;
};

const filterFeatures = (adData) => {
  const features = [...mapFiltersForm.querySelectorAll('.map__features input:checked')];
  return !features.length || features.every((feature) => adData.offer.features.includes(feature.value));
};

const filterPrice = (adData) => {
  const price = mapFiltersForm.querySelector('#housing-price').value
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return adData.offer.price < LOW_PRICE;
    case 'middle':
      return adData.offer.price >= LOW_PRICE && adData.offer.price < HIGH_PRICE;
    case 'high':
      return adData.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
};

const filterRooms = (adData) => {
  const rooms = mapFiltersForm.querySelector('#housing-rooms').value;
  return 'any' === rooms || adData.offer.rooms === Number(rooms);
};

const filterGuests = (adData) => {
  const guests = mapFiltersForm.querySelector('#housing-guests').value;
  return 'any' === guests || adData.offer.guests === Number(guests);
};

const getFilteredAdsData = (adData) => {
  return (
    filterAccomodation(adData) &&
    filterPrice(adData)) &&
    filterFeatures(adData) &&
    filterGuests(adData) &&
    filterRooms(adData)
};

const onFilterChange = (cb) => mapFiltersForm.addEventListener('change', cb);

export { getFilteredAdsData, onFilterChange };
