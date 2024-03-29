import Auth from '../services/Auth';
import { GET, POST, DELETE } from '../constants/HTTPTypes';

class ThroneApi {
  static async accessEndpoint(method, url, body = null) {
    const accessToken = localStorage.getItem('accessToken');
    let response = await this.request(method, url, accessToken, body);

    if (response.status === 401) {
      await Auth.refreshLogin();
      response = await this.request(method, url, accessToken, body);
    }

    return response;
  }

  static async request(method, url, accessToken, body) {
    try {
      return await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });
    } catch (error) {
      return error;
    }
  }

  static createEndpointURL(relativeURL) {
    return new URL(relativeURL, `${process.env.REACT_APP_API_URL}`);
  }

  static async getWashrooms(latitude, longitude, maxResults, amenities, radius) {
    const url = this.createEndpointURL('washrooms');
    if (latitude && longitude) {
      url.searchParams.append('latitude', latitude);
      url.searchParams.append('longitude', longitude);
    }
    url.searchParams.append('max_results', maxResults);
    url.searchParams.append('radius', radius);
    url.searchParams.append('amenities', amenities);
    return this.accessEndpoint(GET, url);
  }

  static async getWashroom(id) {
    const url = this.createEndpointURL(`washrooms/${id}`);
    return this.accessEndpoint(GET, url);
  }

  static async getReviewsForWashroom(id) {
    const url = this.createEndpointURL(`washrooms/${id}/reviews`);
    return this.accessEndpoint(GET, url);
  }

  static async getReview(id) {
    const url = this.createEndpointURL(`reviews/${id}`);
    return this.accessEndpoint(GET, url);
  }

  static async createReview(id, review) {
    const url = this.createEndpointURL(`washrooms/${id}/reviews`);
    return this.accessEndpoint(POST, url, review);
  }

  static async getBuilding(id) {
    const url = this.createEndpointURL(`buildings/${id}`);
    return this.accessEndpoint(GET, url);
  }

  static async getBuildings(latitude, longitude, maxResults, amenities, radius) {
    const url = this.createEndpointURL('buildings');
    if (latitude && longitude) {
      url.searchParams.append('latitude', latitude);
      url.searchParams.append('longitude', longitude);
    }
    url.searchParams.append('max_results', maxResults);
    url.searchParams.append('radius', radius);
    url.searchParams.append('amenities', amenities);
    return this.accessEndpoint(GET, url);
  }

  static async getWashroomsForBuilding(id) {
    const url = this.createEndpointURL(`buildings/${id}/washrooms`);
    return this.accessEndpoint(GET, url);
  }

  static async getUser(id) {
    const url = this.createEndpointURL(`users/${id}`);
    return this.accessEndpoint(GET, url);
  }

  static async getCurrentUser() {
    const url = this.createEndpointURL('users');
    return this.accessEndpoint(GET, url);
  }

  static async getReviewsForUser(id) {
    let path = 'users/reviews';

    if (id) {
      path = `users/${id}/reviews`;
    }

    const url = this.createEndpointURL(path);
    return this.accessEndpoint(GET, url);
  }

  static async getFavoritesForUser() {
    const url = this.createEndpointURL('users/favorites');
    return this.accessEndpoint(GET, url);
  }

  static async addFavorite(id) {
    const url = this.createEndpointURL('users/favorites');
    return this.accessEndpoint(POST, url, { washroom_id: id });
  }

  static async removeFavorite(id) {
    const url = this.createEndpointURL('users/favorites');
    return this.accessEndpoint(DELETE, url, { washroom_id: id });
  }

  static async createWashroom(
    comment,
    longitude,
    latitude,
    gender,
    floor,
    urinalCount,
    stallCount,
    buildingId,
    amenities,
  ) {
    const url = this.createEndpointURL('washrooms');
    return this.accessEndpoint(POST, url, {
      comment,
      location: {
        longitude,
        latitude,
      },
      gender,
      floor,
      urinal_count: urinalCount,
      stall_count: stallCount,
      building_id: buildingId,
      amenities,
    });
  }
}

export default ThroneApi;
