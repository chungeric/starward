import React from 'react';
import serialize from 'serialize-javascript';
import staticAssets from './static-assets/index';

const buildPage = ({ componentHTML, initialState, headAssets }) => {
  const { starward } = initialState || {};
  const { settings } = starward || {};
  const { trackingId } = settings || {};
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript(trackingId)}
  </head>
  <body>
    ${trackingId ?
    `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${trackingId}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>` : ''}
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
    ${staticAssets.createAppScript()}
  </body>
</html>`;
};

export default ({ componentHTML, initialState, headAssets }) => {
  return buildPage({ componentHTML, initialState, headAssets });
};
