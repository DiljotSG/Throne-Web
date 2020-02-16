class ThroneApi {
  static async getEndpoint(url) {
    try {
      return await fetch(url);
    } catch (error) {
      return error;
    }
  }

  static createEndpointURL(relativeURL) {
    return new URL(relativeURL, `${process.env.REACT_APP_API_URL}`);
  }

  static async washrooms() {
    const url = this.createEndpointURL('washrooms');
    return this.getEndpoint(url);
  }

  static async washroom(id) {
    const url = this.createEndpointURL(`washrooms/${id}`);
    return this.getEndpoint(url);
  }

  static async reviews(washroomID) {
    const url = this.createEndpointURL(`washrooms/${washroomID}/reviews`);
    return this.getEndpoint(url);
  }

  static async review(id) {
    const url = this.createEndpointURL(`reviews/${id}`);
    return this.getEndpoint(url);
  }

  static async building(id) {
    const url = this.createEndpointURL(`buildings/${id}`);
    return this.getEndpoint(url);
  }

  static async buildings(location, maxResults, amenities, radius) {
    const url = this.createEndpointURL('buildings');
    url.searchParams.append('location', location);
    url.searchParams.append('maxResults', maxResults);
    url.searchParams.append('radius', radius);
    url.searchParams.append('amenities', amenities);
    return this.getEndpoint(url);
  }

  static async washroomsForBuilding(id) {
    const url = this.createEndpointURL(`buildings/${id}/washrooms`);
    return this.getEndpoint(url);
  }

  static async user(id) {
    const url = this.createEndpointURL(`users/${id}`);
    return this.getEndpoint(url);
  }

  static async userReviews(id) {
    const url = this.createEndpointURL(`users/${id}/reviews`);
    return this.getEndpoint(url);
  }

  static async userFavorites(id) {
    const url = this.createEndpointURL(`users/${id}/favorites`);
    return this.getEndpoint(url);
  }
}

export default ThroneApi;
