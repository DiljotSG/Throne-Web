// import history from './history';

export default class AuthenticationService {
  constructor() {
    this.host = 'https://login.findmythrone.com';
    this.clientID = '3lfsqk8vqctsjg7qaq5t98jq59';
  }

  login() {
    const path = 'login';
    const url = new URL(path, this.host);

    const scope = 'email openid';

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', scope);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    window.location.replace(url.href);
  }

  fetchTokens() {
    const path = 'oauth2/token';
    const url = new URL(path, this.host);

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('grant_type', 'authorization_code');
    url.searchParams.append('code', this.code);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => response.json().then((json) => {
      localStorage.setItem('accessToken', json.access_token);
      this.accessToken = json.access_token;
      this.refreshToken = json.refresh_token;
      this.idToken = json.id_token;
    }));
  }

  authenticate() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('code')) {
      this.code = params.get('code');
    }
  }

  authenticated() {
    return this.code != null;
  }

  refreshTokens() {
    const path = 'oauth2/token';
    const url = new URL(path, this.host);

    url.searchParams.append('client_id', this.clientID);
    url.searchParams.append('grant_type', 'refresh_token');
    url.searchParams.append('refresh_token', this.refreshToken);
    url.searchParams.append('redirect_uri', process.env.REACT_APP_URL);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => response.json().then((json) => {
      localStorage.setItem('accessToken', json.access_token);
      this.accessToken = json.access_token;
      this.refreshToken = json.refresh_token;
      this.idToken = json.id_token;
    }));
  }
}
