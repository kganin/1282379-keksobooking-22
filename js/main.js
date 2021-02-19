import {getSimilarAds} from './data.js';
import {renderAd} from './ad.js';
import './form.js';

const SIMILAR_ADS_COUNT = 10;

const ads = getSimilarAds(SIMILAR_ADS_COUNT);
const newAd = ads[0];

renderAd(newAd);
