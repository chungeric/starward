import favicon from '../../../app/images/favicon.png';
import assets from '../../../public/assets/manifest.json';

const createAppScript = () => `<script async type="text/javascript" charset="utf-8" src="${assets['app.js']}"></script>`;

const createTagManagerSnippet = id => `
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');</script>
`;

const createTrackingScript = trackingID => (trackingID ? createTagManagerSnippet(trackingID) : '');

const createStylesheets = () => `
<link rel="shortcut icon" href="${favicon}" />
<link rel="stylesheet" href="${assets['app.css']}" />
`;

export { createAppScript, createTrackingScript, createStylesheets };
