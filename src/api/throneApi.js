class ThroneApi {
  static async getEndpoint(url) {
    const accessToken = localStorage.getItem('accessToken');
    // console.log(`Using access token ${accessToken}`);

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

  static async getReviewsForUser(id) {
    const url = this.createEndpointURL(`users/${id}/reviews`);
    return this.getEndpoint(url);
  }

  static async getFavoritesForUser(id) {
    const url = this.createEndpointURL(`users/${id}/favorites`);
    return this.getEndpoint(url);
  }
}

export default ThroneApi;
