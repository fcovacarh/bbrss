import axios from "axios";
require("dotenv").config();

export default class Services {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_URL,
      withCredentials: true
    });
  }

  login = credentials => {
    return this.service
      .post("/auth/login", credentials)
      .then(response => response.data);
  };

  logout = () => {
    return this.service.get("auth/logout").then(response => response.data);
  };

  isLoggedIn = () => {
    return this.service.get("/auth/loggedin").then(response => response.data);
  };

  saveSong = songProperties => {
    return this.service
      .post("/song/create", songProperties)
      .then(response => response.data)
      .catch(err => err);
  };

  getUserSongs = songProperties => {
    return this.service
      .get("/song/mySongs")
      .then(response => response.data)
      .catch(err => err);
  };
}
