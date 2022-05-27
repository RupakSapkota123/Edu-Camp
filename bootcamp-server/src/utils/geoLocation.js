import NodeGeocoder from 'node-geocoder';
import { config } from '../config/index.js';

const options = {
  provider: config.geocoder.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: config.geocoder.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
