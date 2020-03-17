# Running Directions

Make sure to complete the project [setup](SETUP.md) before running the continuing.

## Run App

1. Use the following to run the app in development mode:

    ```shell
    yarn start
    ```

2. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

**Note:**

* The page will reload if you make edits.
* You will also see any lint errors in the console.

## Linting

Launch the linter using:

```shell
yarn lint
```

**Note:** Can run `yarn lint --fix` to automatically fix errors

## Building

Use the following to build the app to the `build` folder for production:

```shell
yarn build
```

### Serving the built files

The built files can't be run without serving them up with a server.

The easiest way to do this is with a package called `serve`.

To install `serve`

```shell
yarn global add serve
```

To start the server

```shell
serve -s build
```

Where `build` is the directory to serve.

**Note:**

* It correctly bundles React in production mode and optimizes the build for the best performance.
* The build is minified and the filenames include the hashes.
* Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Running Backend Locally

1. To run the backend locally, first visit [Throne-Backend](https://github.com/DiljotSG/Throne-Backend) and follow all installation instructions there.

2. Once the backend is running you must add/change the line in your `.env.local` file.

    ```env
    REACT_APP_API_URL=http://localhost:<port>
    ```

    **Note:** `port` must match the port number the backend is running at.
