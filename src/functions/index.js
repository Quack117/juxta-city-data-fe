import axios from "axios";
import { buildQueryString } from "./buildQueryString";
import jwt_decode from "jwt-decode";
import { axiosWithAuth } from "./axiosWithAuth";

const addFavorite = (userId, cityId) => {
  const object = { user_id: userId, city_id: cityId };
  axiosWithAuth()
    .post(
      `https://production-juxta-city-be.herokuapp.com/api/users/${userId}/favorites`,
      object
    )
    .then((res) => {
      console.log(res, "favorite completed!");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postProfileRequest = (userData, userId) => {
  axiosWithAuth()
    .post(
       `https://production-juxta-city-be.herokuapp.com/api/profile/${userId}`,
      userData
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

const getProfileRequest = async () => {
  const token = localStorage.getItem("token");
  //const userId = jwt_decode(token).userid;
  const userId = localStorage.getItem("userId");

  let response = await axiosWithAuth().get(
    `https://production-juxta-city-be.herokuapp.com/api/profile/${userId}`
  );
  let responseProfileData = await response.data;

  return responseProfileData;
};

const deleteProfile = async () => {
  const token = localStorage.getItem("token");
  //const userId = jwt_decode(token).userid;
  const userId = localStorage.getItem("userId");

  let response = await axiosWithAuth().delete(
    `https://production-juxta-city-be.herokuapp.com/api/profile/${userId}`
  );
  let responseProfileData = await response.data;

  return responseProfileData;
};


const editProfile = async (userData) => {
  const token = localStorage.getItem("token");
  //const userId = jwt_decode(token).userid;
  const userId = localStorage.getItem("userId");

  let response = await axiosWithAuth().put(
    `https://production-juxta-city-be.herokuapp.com/api/profile/${userId}`, userData
  );
  let responseProfileData = await response.data;

  return responseProfileData;
};

const removeFavorite = (userId, cityId) => {
  axiosWithAuth()
    .delete(
      `https://production-juxta-city-be.herokuapp.com/api/users/${userId}/favorites/${cityId}`
    )
    .then((res) => {
      console.log(res, "unfavorite completed!");
    });
};

const getCityData = async (cityName) => {
  let res = await axios.get(
    `https://junta-test.herokuapp.com/data?city=${cityName}`
  );
  return res.data;
};

const createUserContext = async () => {
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).userid;
  //const userId = localStorage.getItem("userId")


  let context = {
    favorites: [],
  };

  let user = await axiosWithAuth().get(
    `https://production-juxta-city-be.herokuapp.com/api/users/${userId}`
  );
  let userData = await user.data;
  context = { ...context, ...userData };
  let favorites = await axiosWithAuth().get(
    `https://production-juxta-city-be.herokuapp.com/api/users/${userId}/favorites`
  );
  for (const favorite of favorites.data) {
    const result = await axiosWithAuth().get(
      `https://junta-test.herokuapp.com/name?id=${favorite.city_id}`
    );
    context.favorites.push({ id: favorite.city_id, city: result.data });
  }
  return context;
};

const createProfileContext = async () => {
  const token = localStorage.getItem("token");
  // const userId = jwt_decode(token).userid;
  const userId = localStorage.getItem("userId")

  let response = await axiosWithAuth().get(
    `https://production-juxta-city-be.herokuapp.com/api/profile/${userId}/user`
  );
  let responseProfileData = await response.data;

  return responseProfileData;
};

const getBestCities = async () => {
  const res = await axios.get("https://junta-test.herokuapp.com/top25");
  return res.data;
};

const getRecomendedCities = async (queryParameters) => {
  let url = "https://junta-test.herokuapp.com/recommend";
  url = buildQueryString(url, queryParameters);
  const res = await axios.get(url);
  return res.data;
};

const getCityArray = async (chars) => {
  let res = await axios.get(
    `https://junta-test.herokuapp.com/search?search=${chars}`
  );
  return res.data;
};

export {
  addFavorite,
  removeFavorite,
  createUserContext,
  getCityData,
  getBestCities,
  getRecomendedCities,
  getCityArray,
  postProfileRequest,
  createProfileContext,
  getProfileRequest,
  editProfile,
  deleteProfile
};
