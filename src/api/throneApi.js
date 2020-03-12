import Auth from '../services/Auth';

class ThroneApi {
  static async getEndpoint(url) {
    const accessToken = localStorage.getItem('accessToken');
    let response = await this.getRequest(url, accessToken);

    if (response.status === 401) {
      await Auth.refreshLogin();
      response = await this.getRequest(url, accessToken);
    }

    return response;
  }

  static async postEndpoint(url, data) {
    const accessToken = localStorage.getItem('accessToken');
    let response = await this.postRequest(url, accessToken, data);

    if (response.status === 401) {
      await Auth.refreshLogin();
      response = await this.postRequest(url, accessToken, data);
    }

    return response;
  }

  static async deleteEndpoint(url, data) {
    const accessToken = localStorage.getItem('accessToken');
    let response = await this.deleteRequest(url, accessToken, data);

    if (response.status === 401) {
      await Auth.refreshLogin();
      response = await this.deleteRequest(url, accessToken, data);
    }

    return response;
  }

  static async getRequest(url, accessToken) {
    try {
      return await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      return error;
    }
  }

  static async postRequest(url, accessToken, data) {
    try {
      return await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      return error;
    }
  }

  static async deleteRequest(url, accessToken, data) {
    try {
      return await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      return (error);
    }
  }

  static createEndpointURL(relativeURL) {
    return new URL(relativeURL, `${process.env.REACT_APP_API_URL}`);
  }

  static async getWashrooms() {
    const url = this.createEndpointURL('washrooms');
    return this.getEndpoint(url);
  }

  static async getWashroom(id) {
    const url = this.createEndpointURL(`washrooms/${id}`);
    return this.getEndpoint(url);
  }

  static async getReviewsForWashroom(id) {
    const url = this.createEndpointURL(`washrooms/${id}/reviews`);
    return this.getEndpoint(url);
  }

  static async getReview(id) {
    const url = this.createEndpointURL(`reviews/${id}`);
    return this.getEndpoint(url);
  }

  static async getBuilding(id) {
    const url = this.createEndpointURL(`buildings/${id}`);
    return this.getEndpoint(url);
  }

  static async getBuildings(location, maxResults, amenities, radius) {
    const url = this.createEndpointURL('buildings');
    url.searchParams.append('location', location);
    url.searchParams.append('maxResults', maxResults);
    url.searchParams.append('radius', radius);
    url.searchParams.append('amenities', amenities);
    return this.getEndpoint(url);
  }

  static async getWashroomsForBuilding(id) {
    const url = this.createEndpointURL(`buildings/${id}/washrooms`);
    return this.getEndpoint(url);
  }

  static async getUser(id) {
    const url = this.createEndpointURL(`users/${id}`);
    return this.getEndpoint(url);
  }

  static async getCurrentUser() {
    const url = this.createEndpointURL('users');
    return this.getEndpoint(url);
  }

  static async getReviewsForUser(id) {
    const url = this.createEndpointURL(`users/${id}/reviews`);
    return this.getEndpoint(url);
  }

  static async addFavorite(id) {
    const url = this.createEndpointURL('users/favorites');
    return this.postEndpoint(url, { washroom_id: id });
  }

  static async removeFavorite(id) {
    const url = this.createEndpointURL('users/favorites');
    return this.deleteEndpoint(url, { washroom_id: id });
  }
}

export default ThroneApi;
