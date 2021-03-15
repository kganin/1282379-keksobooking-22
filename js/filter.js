import { mapFiltersForm } from './form.js'

const filterAccomodation = (adData) => {
  const accomodation = mapFiltersForm.querySelector('#housing-type').value;
  return 'any' === accomodation || adData.offer.type === accomodation;
};

const filterFeatures = (adData) => {
  const features = [...mapFiltersForm.querySelectorAll('.map__features input:checked')].map((feature) => feature.value);
  return !features.length || features.every((feature) => adData.offer.features.includes(feature));
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

const getFilteredAdsData = (adData) => {
  return (
    filterAccomodation(adData) &&
    filterPrice(adData)) &&
    filterFeatures(adData)
};

const setFilterChange = (cb) => mapFiltersForm.addEventListener('change', cb);

export { getFilteredAdsData, setFilterChange }
