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

## Mapbox
1. Retrieve the token from slack (or[ create your own](https://account.mapbox.com/))
2. Add the token as an environment variable to `.env.local` and `env.example` like so:
`REACT_APP_MAPBOX_TOKEN="<TokenHere>"`

Instuctions on how to create a Mapbox account and token can be found in [this PR](https://github.com/DiljotSG/Throne-Web/pull/64).
