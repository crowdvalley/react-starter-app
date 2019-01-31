import Crowdvalley from '@crowdvalley/crowdvalley-v4-sdk';
import {API_KEY} from '../config';

const client = new Crowdvalley(
    Crowdvalley.ENV_DEV,
    Crowdvalley.ENV_TYPE_BACKOFFICE,
    API_KEY
);

export {client}