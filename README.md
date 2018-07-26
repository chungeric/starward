# :boom: Starward

> Full-stack Wordpress boilerplate web app built using ReactJS and WP REST API v2, built on the awesome reactGo framework  :tada:

## Features:
- [**React 16**](https://facebook.github.io/react/)
- [**React Router 4**](https://github.com/reactjs/react-router)
- [**Webpack 4**](https://github.com/webpack/webpack)
- [**ECMAScript 2017 (ES7)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_Next_support_in_Mozilla)
- [**Universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) rendering :earth_asia:
- [**GraphQL**](http://graphql.org/learn/)
- [**Redis**](https://redis.io/) page caching
- [**Redux**](https://github.com/reactjs/redux)
- [**React Router Redux**](https://github.com/reactjs/react-router-redux)
- [**React Hot Loader**](https://github.com/gaearon/react-hot-loader)
- [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**CSS Module w/ SASS support**](https://github.com/css-modules/css-modules)
- [**Code Splitting**](https://webpack.js.org/guides/code-splitting/)
- [**Express 4.x**](https://expressjs.com/en/api.html) server

## Wordpress Dependencies
Requires a Wordpress setup using the following plugins:
- [**WP Rest API**](https://en-au.wordpress.org/plugins/rest-api/)
- [**WP Rest API - Search by Path**](https://github.com/samlogan/wp-rest-api-search-by-path)
- [**WP API Basic Auth**](https://github.com/WP-API/Basic-Auth)
- [**WP API Menus**](https://en-au.wordpress.org/plugins/wp-api-menus/)
- [**Better REST API Featured Images**](https://en-au.wordpress.org/plugins/better-rest-api-featured-images/)
- [**Yoast SEO**](https://yoast.com/wordpress/plugins/seo/)
- [**WP REST API Yoast SEO**](https://en-au.wordpress.org/plugins/wp-api-yoast-meta/)

**Strongly** recommended plugins
- [**ACF Pro**](https://www.advancedcustomfields.com/pro/)
- [**ACF to REST API**](https://en-au.wordpress.org/plugins/acf-to-rest-api/)

Optional supported plugins
- [**ACF**](https://www.advancedcustomfields.com/)
- [**Gravity Forms**](http://www.gravityforms.com/)
- [**Gravity Forms REST API v2**](https://www.gravityhelp.com/gravity-forms-rest-api-v2-beta-2-released/)

## Getting started

⛔️ 📛 🚫 **IMPORTANT** run `yarn build` or `npm run build` at the start of each project

### Running Server

`yarn && yarn dev` / `npm install && npm run dev`

### Configuration

#### Client App Config

Rename `/app/config/app-template.js` to `/app/config/app.js`

- `SITE_NAME` fallback site name if ACF options page is unavailable
- `POSTS_PER_PAGE` number of posts to be shown on blog, category and author listing pages, default **10**
- `HOME_SLUG` WP slug for front page, default **homepage**
- `BLOG_SLUG` WP slug for posts page, default **blog**
- `CATEGORY_SLUG` desired root slug for category pages, default **category**
- `AUTHOR_SLUG` desired root slug for author pages, default **author**
- `ROOT_API` GraphQL root URL *(does not require changing from default)*

#### Server Config (contains secrets, don't include inside client/front end code)

Rename `/server/config/app-template.js` to `/server/config/app.js`
- `WP_URL` root URL of Wordpress installation
- `WP_API` root of WP API *(does not require changing from default)*
- `WP_AUTH` Basic auth details for API/developer user, used for submissions of Gravity Forms - **Don't expose to front end**
- `REDIS_PREFIX` Prefix for redis keys to avoid key clashes during development (required in production unless you disable redis via ENV variables)

### Redis Setup (optional)

- Redis runs by default in production, this can be changed in `/env.js`
- Redis can be ran whilst in development by running `npm run dev:redis` or `yarn dev:redis`
- Redis cache can be cleared by hitting `${baseURL}/api/flushredis` in your browser

#### Install Redis (optional):

`brew install redis`

*(you can also [manually install](https://redis.io/topics/quickstart), but if you don't have brew it's rather useful!)*

Open a new terminal and run

`redis-server /usr/local/etc/redis.conf`

make sure to keep this terminal open as it's not running as a daemon. To see more ways of launching redis, check this [blog post](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298) out.

### Quick and dirty ACF Pro Setup

Two ready to import [JSON field groups](https://support.advancedcustomfields.com/forums/topic/import-export-fields-groups/) are located here `/wp/ACF`:

- `page_flexible_content.json` - Component based (`/app/components/ACF/layout`) field group using the native ACF PRO flexible content field
- `settings_option_page.json` - Generic setting fields designed for a [custom option page](https://www.advancedcustomfields.com/resources/options-page/) within Wordpress and accessible from the GraphQL endpoint `/api/settings`

### SCSS

Component and container level based styles exist in `/app/components/*/*.scss` & `app/containers/*/*.scss` and are imported at the top of each JSX file (beneath absolute and relative module/component imports) like:

```
// Header.jsx
import React from 'react';
import { Logo } from './Logo';
import './Header.scss';
```

Global SASS partials (variables, typography, grid settings etc) are contained within `/app/sass/` and are split between two folders:

#### /base

Boilerplate partials including a reset, default typography rules, grid, print and reusable, per project mixins like *_omega-reset.scss*

#### /helpers

For storing mixins, functions and other Sass tools used across the project

### GraphQL

All data from WP-API is consumed in GraphQL with the help of Graph.ql (https://github.com/matthewmueller/graph.ql), which returns a smaller, more succinct response using Express. The purpose is to reduce the amount of JSON contained within the initial state that gets supplied to the document by the server when running universally.

The GraphQL schemas and queries are located within `/graphQL`

The GraphQL API endpoints are defined within `server/init/api.js`

Out of the box the following API requests can be made to the API server `localhost:3000/api` and can be extended by adding additional GraphQL schema within `/graphQL`:

#### Get site settings from ACF PRO options page

Pulls data from a [custom option page](https://www.advancedcustomfields.com/resources/options-page/) containing the following ACF fields `/wp/ACF/settings_option_page.json`

`GET: api/settings`

#### Get a page

`GET: api/page?slug=*`

#### Get a post

`GET: api/post?slug=*`

#### Get collection of posts

`GET: api/posts?page=*`

#### Get a category and list of posts

`GET: api/category?slug=*&page=*`

#### Get an author and list of posts

`GET: api/author?name=*&page=*`

#### Get results from a search request

`GET: api/search?term=SEARCH_TERM&type=posts&page=1&perPage=10`

#### Get a Gravity Form

`GET: api/gravityforms?id=*`

*Please note submitting the Gravity Form is handled by a direct API post request to the WP GF API v2 service inside an action, please view app/actions/gravityforms.js*
