class WashroomApi {
  static async washrooms() {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/washrooms`);
      return await response;
    } catch (error) {
      return error;
    }
  }
}

export default WashroomApi;
