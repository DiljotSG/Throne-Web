import fetchMock from 'fetch-mock';
import ThroneApi from '../throneApi';

import washrooms from './data/washrooms.json';
import reviews from './data/reviews.json';
import newReview from './data/newReview.json';
import buildings from './data/buildings.json';
import buildingWashrooms from './data/buildingWashrooms.json';
import user from './data/user.json';
import userReviews from './data/userReviews.json';
import favorites from './data/favorites.json';

const paramsDefault = 'max_results=null&radius=null&amenities=null';
const paramsLocation = 'latitude=69.42&longitude=69.696&max_results=null&radius=null&amenities=null';

fetchMock.getOnce(`https://testapi.com/washrooms?${paramsDefault}`, washrooms);
fetchMock.getOnce(`https://testapi.com/washrooms?${paramsLocation}`, washrooms);
fetchMock.getOnce('https://testapi.com/washrooms/1', washrooms[0]);
fetchMock.getOnce('https://testapi.com/washrooms/1/reviews', reviews);
fetchMock.postOnce('https://testapi.com/washrooms/1/reviews', newReview);
fetchMock.getOnce('https://testapi.com/reviews/2', reviews[1]);
fetchMock.getOnce('https://testapi.com/buildings', buildings);
fetchMock.getOnce(`https://testapi.com/buildings?${paramsDefault}`, buildings);
fetchMock.getOnce(`https://testapi.com/buildings?${paramsLocation}`, buildings);
fetchMock.getOnce('https://testapi.com/buildings/1', buildings[0]);
fetchMock.getOnce('https://testapi.com/buildings/1/washrooms', buildingWashrooms);
fetchMock.getOnce('https://testapi.com/users', user);
fetchMock.getOnce('https://testapi.com/users/favorites', favorites);
fetchMock.postOnce('https://testapi.com/users/favorites', favorites);
fetchMock.deleteOnce('https://testapi.com/users/favorites', favorites);
fetchMock.getOnce('https://testapi.com/users/1', user);
fetchMock.getOnce('https://testapi.com/users/1/reviews', userReviews);


describe('createEndpointURL', () => {
  it('creates the proper URL', async () => {
    const relativeURL = 'washrooms';

    const url = ThroneApi.createEndpointURL(relativeURL);
    expect(url.href).toBe('https://testapi.com/washrooms');
  });
});

describe('getWashrooms', () => {
  it('receives a list of washrooms with default parameters', async () => {
    const data = await ThroneApi.getWashrooms(null, null, null, null, null);
    expect(data.status).toBe(200);

    const response = JSON.parse(data.body);
    expect(response).toStrictEqual(washrooms);
  });

  it('receives a list of washrooms with location parameters', async () => {
    const latitude = 69.42;
    const longitude = 69.696;
    const maxResults = null;
    const amenities = null;
    const radius = null;

    const data = await ThroneApi.getWashrooms(latitude, longitude, maxResults, amenities, radius);
    expect(data.status).toBe(200);

    const response = JSON.parse(data.body);
    expect(response).toStrictEqual(washrooms);
  });
});

describe('getWashroom', () => {
  it('receives the correct washroom', async () => {
    const response = await ThroneApi.getWashroom(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(washrooms[0]);
  });
});

describe('getReviewsForWashroom', () => {
  it('receives the reviews for a washroom', async () => {
    const response = await ThroneApi.getReviewsForWashroom(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(reviews);
  });
});

describe('getReview', () => {
  it('receives the correct review', async () => {
    const response = await ThroneApi.getReview(2);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(reviews[1]);
  });
});

describe('createReview', () => {
  it('receives the created review', async () => {
    const response = await ThroneApi.createReview(1, newReview);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(newReview);
  });
});

describe('getBuildings', () => {
  it('receives a list of buildings with default parameters', async () => {
    const data = await ThroneApi.getBuildings(null, null, null, null, null);
    expect(data.status).toBe(200);

    const response = JSON.parse(data.body);
    expect(response).toStrictEqual(buildings);
  });

  it('receives a list of buildings with location parameters', async () => {
    const latitude = 69.42;
    const longitude = 69.696;
    const maxResults = null;
    const amenities = null;
    const radius = null;

    const data = await ThroneApi.getBuildings(latitude, longitude, maxResults, amenities, radius);
    expect(data.status).toBe(200);

    const response = JSON.parse(data.body);
    expect(response).toStrictEqual(buildings);
  });
});

describe('getWashroomsForBuilding', () => {
  it('receives the washrooms for a building', async () => {
    const response = await ThroneApi.getWashroomsForBuilding(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(buildingWashrooms);
  });
});

describe('getUser', () => {
  it('receives the user based on ID', async () => {
    const response = await ThroneApi.getUser(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(user);
  });
});

describe('getCurrentUser', () => {
  it('receives the current user', async () => {
    const response = await ThroneApi.getCurrentUser();
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(user);
  });
});

describe('getReviewsForUser', () => {
  it('receives the reviews for a user', async () => {
    const response = await ThroneApi.getReviewsForUser(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(userReviews);
  });
});

describe('addFavorite', () => {
  it('receives the correct response a favorite is added', async () => {
    const response = await ThroneApi.addFavorite(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(favorites);
  });
});

describe('removeFavorite', () => {
  it('receives the correct response when a favorite is removed', async () => {
    const response = await ThroneApi.removeFavorite(1);
    const body = JSON.parse(response.body);

    expect(response.status).toBe(200);
    expect(body).toStrictEqual(favorites);
  });
});
