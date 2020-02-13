# Please review our MASTER BRANCH when taking a snapshot!

Master

![Node.js CI](https://github.com/DiljotSG/Throne-Web/workflows/Node.js%20CI/badge.svg?branch=master)

Develop

![Node.js CI](https://github.com/DiljotSG/Throne-Web/workflows/Node.js%20CI/badge.svg?branch=develop)

# Throne for Web
This repository contains the Throne Web application.

Throne is a web and mobile application which allows users to find nearby washrooms tailored to their preferences and requirements. Throne presents up-to-date information by enabling users to provide feedback and information on the washrooms they visit.

Throne Component | Reposistory | Project Board
------------ | ------------- | ------------
All Components | - | [User Stories](https://github.com/DiljotSG/Throne-Backend/projects/1)
Backend | [Throne-Backend](https://github.com/DiljotSG/Throne-Backend) | [Backend Tasks](https://github.com/DiljotSG/Throne-Backend/projects/2)
**Web** | [Throne-Web](https://github.com/DiljotSG/Throne-Web) | [Web Tasks](https://github.com/DiljotSG/Throne-Web/projects/1)
iOS | [Throne-iOS](https://github.com/NickJosephson/Throne-iOS) | [iOS Tasks](https://github.com/NickJosephson/Throne-iOS/projects/1)
Android | [Throne-Android](https://github.com/NickJosephson/Throne-Android) | [Android Tasks](https://github.com/NickJosephson/Throne-Android/projects/1)

# Live Websites

### Production Web Application - `master` branch: https://app.findmythrone.com

### Development Web Application- `develop` branch: https://dev.findmythrone.com

## Setup

These are the setup instructions for macOS (requires Brew). Installing these dependencies should be similar for other platforms with the appropriate package managers for that platform.

## Installing Node
```shell
brew install node
```

## Installing Yarn
```shell
brew install yarn
```

## `.env` files

Copy the `.env.example` file in the root folder to a new file called `.env.local`.

Note: No changes need to be made to `.env`.

If you want to run the backend locally, follow directions further down in the README.

## Running Directions

In the project directory, you can run:

### `yarn install`

Installs all dependencies required

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn lint`

Launches the linter (can run `yarn lint --fix` to automatically fix errors)

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running backend locally

To run the backend locally, first visit [Throne-Backend](https://github.com/DiljotSG/Throne-Backend) and follow all installation instructions there.

Once the backend is running you must add/change the line in your `.env.local` file.

```env
REACT_APP_API_URL=http://localhost:<port>
```

Note: `port` must match the port number the backend is running at.
