import { createMiddleware } from 'redux-beacon';
import GoogleTagManager from '@redux-beacon/google-tag-manager';

/* Redux events */
import { LOCATION_CHANGE } from 'react-router-redux';
import { SUBMIT_FORM_SUCCESS } from '../actions/types';

/* Event Definitions */

/* Example event definition */
// const sampleEvent = (action, prevState, nextState) => {
//   return {
//     event: /* fill me in */,
//     /* add any additional key/value pairs below */,
//   };
// };

const pageView = (action) => {
  return {
    event: 'starward.pageview',
    page: action.payload.pathname
  };
};

const formSubmitSuccess = (action) => {
  return {
    event: 'starward.formsubmit',
    formId: action.key,
    formTitle: action.formTitle
  };
};

/* Create Events Map */
const eventsMap = {
  [LOCATION_CHANGE]: pageView,
  [SUBMIT_FORM_SUCCESS]: formSubmitSuccess
};

/* Set target */
const target = GoogleTagManager();

/* Create Middleware */
export const gtmMiddleware = createMiddleware(eventsMap, target);
