# Setup

These setup instructions are for macOS using [Homebrew](https://brew.sh). Installing these dependencies should be similar for other platforms with the appropriate package managers for that platform.

## Node Installation

Install Node using the following:

```shell
brew install node
```

## Yarn Installation

1. Install Yarn using the following:

    ```shell
    brew install yarn
    ```

2. In the project directory, run the following to install all required dependencies:

    ```shell
    yarn install
    ```

    **Note:** Run this command again if dependencies are changed.

## Environment Files

Copy the `.env.example` file found in the root folder to a new file named `.env.local`.

**Note:**

* No changes need to be made to `.env`.

## Adding a Mapbox Token
1. Retrieve the token from slack (or[ create your own](https://account.mapbox.com/))
2. Add the token as an environment variable to `.env.local` and `env.example` like so:
`REACT_APP_MAPBOX_TOKEN="<TokenHere>"`

## Creating a Mapbox Account and Token
1. Go to [mapbox.com](https://www.mapbox.com/) and click 'Start mapping for Free'
2. Fill in your credentials and create an account
3. Go to your account dashboard [account.mapbox.com](https://account.mapbox.com/)
4. Scroll down and you should see that you have a default public token. You can use that one for our purposes. 
5. If you decide to create a second token, just use the default scopes

The right column of your dashboard will show the number of free map loads you have. The free plan is 50,000 loads monthly for web and 25,000 for mobile.

