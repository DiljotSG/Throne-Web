export default class Auth {
  static host = 'https://login.findmythrone.com';

  static clientID = '3lfsqk8vqctsjg7qaq5t98jq59';

  static scope = 'email openid';

  static async attemptLogin() {
    const params = new URLSearchParams(window.location.search);

    if (!this.authenticated()) {
      if (params.has('code')) {
        return this.fetchTokens(params.get('code'));
      }
      window.location.replace(this.loginAddress().href);
      return false;
    }
    return true;
  }

  static refreshLogin() {
    // Use local storage values to refresh
  }

  // Given a user's sign in code, fetch tokens associated with it
  static async fetchTokens(code) {
    // console.log(`Fetching tokens for ${code}`);

    const path = 'oauth2/token';
    const url = new URL(path, this.host);

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('grant_type', 'authorization_code');
    url.searchParams.append('code', code);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    return this.setTokens(url);
  }

  // Refresh a user's id, access, and refresh token
  static async refreshTokens() {
    // console.log('Refreshing tokens');

    const refreshToken = localStorage.getItem('refreshToken');

    const path = 'oauth2/token';
    const url = new URL(path, this.host);

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('grant_type', 'refresh_token');
    url.searchParams.append('refresh_token', refreshToken);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    return this.setTokens(url);
  }

  // Set/refresh tokens given a URL
  static async setTokens(url) {
    // console.log('Setting tokens');

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => response.json().then((json) => {
      localStorage.setItem('idToken', json.id_token);
      localStorage.setItem('accessToken', json.access_token);
      localStorage.setItem('refreshToken', json.refresh_token);

      // console.log('Tokens set:');
      // console.log(localStorage.getItem('idToken'));
      // console.log(localStorage.getItem('accessToken'));
      // console.log(localStorage.getItem('refreshToken'));
    }));

    return true;
  }

  static loginAddress() {
    const path = 'login';
    const url = new URL(path, this.host);

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', this.scope);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    return url;
  }

  static signUpAddress() {
    const path = 'signup';
    const url = new URL(path, this.host);

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', this.scope);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    return url;
  }

  static authenticated() {
    const idToken = localStorage.getItem('idToken');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const authenticated = (idToken != null && idToken !== 'undefined')
      && (accessToken != null && accessToken !== 'undefined')
      && (refreshToken != null && refreshToken !== 'undefined');

    // console.log('Authenticated:', authenticated);
    return authenticated;
  }
}
