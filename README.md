**This repo is out of date and is archived. Check out [an updated tutorial on using FusionAuth with React](https://fusionauth.io/docs/quickstarts/quickstart-javascript-react-web) or [the updated GitHub repository](https://github.com/fusionauth/fusionauth-quickstart-javascript-react-web).**

# FusionAuth Example: React version 2.0

## No longer maintained

## About

This simple example app shows how you can use FusionAuth and the Authorization Code Grant in a React app to create and register users within FusionAuth, as well as log in log out via the React Client.

This application will use an OAuth Authorization Code workflow to log users in and a NodeJS backend to store your access token securely.

## Setup

1. Make sure you have everything you need to run this app:

	- [NodeJS](https://nodejs.org/en/download/)
	- [MySQL](https://fusionauth.io/docs/v1/tech/installation-guide/database#install-mysql) or [Postgres](https://fusionauth.io/docs/v1/tech/installation-guide/database#install-postgresql)
	- [FusionAuth](https://fusionauth.io/download)

2. Clone this repository.

3. Configure your app in the FusionAuth admin panel (default [localhost:9011](localhost:9011)).

4. Make sure FusionAuth is running, then install dependencies and start the app. The React app should automatically open in your browser at [localhost:3000](http://localhost:3000).

	```zsh
	cd server
	npm install
	npm start
	```
	```zsh
	cd client
	npm install
	npm start
	```

## Understanding the Example

### Structure

The app has three parts, each running on a different `localhost` port (unless you've decided to set it up otherwise):

- `localhost/3000` is your React app. It has a single route (`/`) and makes calls to the Express app.
- `localhost/3001` is your Express app. It has several routes (like `/login` and `/logout`), which are used by the React app. The Express app makes calls to FusionAuth.
- `localhost/9011` is your instance of FusionAuth. It has several endpoints (like `/authorize` and `/introspect`). It accepts calls from the Express app and sends back information, such as access tokens and user registration data.

The three parts connect like this:

`React <-> Express <-> FusionAuth`

Which have the following ports:

`3000 <-> 3001 <-> 9011`

The React app does not directly communicates with FusionAuth, instead, all communication between your app and FusionAuth is relegated to the Express backend. Since the React app can be examined by anyone online, it is best to keep all sensitive communications on a trusted, server-side network.

### The Authorization Code Grant

When the user clicks on `sign in`, the React app redirects to the Express server's `/login` route, which redirects to FusionAuth's `authorize` endpoint. FusionAuth renders the username/password form, authenticates the user, and redirects to the configured Redirect URI (`/oauth-redirect` on the Express server) with an Authorization Code.

The Express server sends the Authorization Code (as well as its Client ID and Secret) to FusionAuth's `/token` endpoint. FusionAuth validates everything and sends back an Access Token. The Express Server saves this token in session storage and redirects back to the React client.

When the user clicks on `sign out`, the React app sends a request to the Express server's `/logout` route, which sends a request to FusionAuth's `/logout` endpoint, deletes the relevant cookie, and deletes the Access Token from session storage.

**The presence of the Access Token in session storage is what defines whether or not a user is logged in**, because FusionAuth will not allow retrieval or modification of user data without a valid Access Token.

### Rendering the React App

When the React client mounts, it sends a request to the Express server's `/user` route. If there's an Access Token in session storage, the Express server uses FusionAuth's `/introspect` and `/registration` endpoints to get data for the current user; these give us the `token` and `registration` JSON objects seen in the example app.

If there is no Access Token (or if it's expired), `/user` will instead return an empty object. The React components use the existence of `token` (or lack thereof) to determine whether to render the page in its logged-in or logged-out state.

## Using This Example as a Starting Point

If you want to use this example app as a jumping-off point for your own FusionAuth app, you can easily strip it down or expand upon it.

- remove, replace, or add React components in `/client/app/components/` and update references in `/client/app/index.js`
- remove, replace, or add styles in `/client/app/styles/` and update references in `/client/app/index.css`
- remove, replace, or add routes in `/server/routes/` and update references in `/server/index.js`
- add some CSS to make it look good.

## Contributing

To contribute, please open a PR on this repository.
