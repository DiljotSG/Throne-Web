class ThroneApi {
  static async getEndpoint(url) {
    try {
      return await fetch(`${process.env.REACT_APP_API_URL}/${url}`);
    } catch (error) {
      return error;
    }
  }

  static async washrooms() {
    return this.getEndpoint('washrooms');
  }

  static async washroom(id) {
    return this.getEndpoint(`washrooms/${id}`);
  }

  static async reviews(washroomID) {
    return this.getEndpoint(`washrooms/${washroomID}/reviews`);
  }

  static async review(id) {
    return this.getEndpoint(`reviews/${id}`);
  }

  static async building(id) {
    return this.getEndpoint(`buildings/${id}`);
  }

  static async buildings(location, numOfResults, radius) {
    return this.getEndpoint(`buildings/?location=${location}&numOfResults=${numOfResults}&radius=${radius}`);
  }

  static async buildingsWashrooms(id) {
    return this.getEndpoint(`buildings/${id}/washrooms`);
  }

  static async user(id) {
    return this.getEndpoint(`users/${id}`);
  }

  static async userReviews(id) {
    return this.getEndpoint(`users/${id}/reviews`);
  }

  static async userFavorites(id) {
    return this.getEndpoint(`users/${id}/favorites`);
  }
}

export default ThroneApi;
