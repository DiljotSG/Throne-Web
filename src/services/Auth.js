export default class Auth {
  static host = 'https://login.findmythrone.com';

  static clientID = '3lfsqk8vqctsjg7qaq5t98jq59';

  static scope = 'email openid';

  static refreshAttempted = false;

  static async attemptLogin() {
    await Auth.refreshLogin();

    const params = new URLSearchParams(window.location.search);

    if (!Auth.authenticated()) {
      if (params.has('code')) {
        const response = await this.fetchTokens(params.get('code'));

        // clear the query parameter
        window.location.href = window.location.origin;

        return response.ok;
      }
      return false;
    }
    return true;
  }

  static logout() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  }

  // Refresh the access token.
  //
  // This is needed if the access token has expired (usually after 60 minutes).
  // If a refresh has already been attempted, a log out is performed.
  static async refreshLogin() {
    if (Auth.refreshAttempted) {
      Auth.logout();
      return;
    }

    const response = await Auth.refreshTokens();

    if (response.ok) {
      Auth.refreshAttempted = false;
    } else {
      Auth.refreshAttempted = false;
      Auth.logout();
    }
  }

  // Given a user's sign in code, fetch tokens associated with it
  static async fetchTokens(code) {
    const path = 'oauth2/token';
    const url = new URL(path, Auth.host);

    url.searchParams.append('client_id', Auth.clientID);
    url.searchParams.append('grant_type', 'authorization_code');
    url.searchParams.append('code', code);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    return Auth.setTokens(url);
  }

  // Refresh a user's id, access, and refresh token
  static async refreshTokens() {
    Auth.refreshAttempted = true;

    const refreshToken = localStorage.getItem('refreshToken');
    const path = 'oauth2/token';
    const url = new URL(path, Auth.host);

    url.searchParams.append('client_id', Auth.clientID);
    url.searchParams.append('grant_type', 'refresh_token');
    url.searchParams.append('refresh_token', refreshToken);

    return Auth.setTokens(url);
  }

  // Set/refresh tokens given a URL
  static async setTokens(url) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => response.json().then((json) => {
      localStorage.setItem('idToken', json.id_token);
      localStorage.setItem('accessToken', json.access_token);

      if ('refresh_token' in json) {
        localStorage.setItem('refreshToken', json.refresh_token);
      }

      return response;
    })).catch((error) => { throw (error); });
  }

  static loginAddress() {
    const path = 'login';
    const url = new URL(path, Auth.host);

    url.searchParams.append('client_id', Auth.clientID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', Auth.scope);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    return url;
  }

  static signUpAddress() {
    const path = 'signup';
    const url = new URL(path, Auth.host);

    url.searchParams.append('client_id', Auth.clientID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', Auth.scope);
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

    return authenticated;
  }
}
