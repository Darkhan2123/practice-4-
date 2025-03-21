import axios from "axios";
import authService from "./auth.service";

const API_URL = "/api/";

class UserService {
  async getProfile() {
    const response = await axios.get(API_URL + "profiles/my_profile/", {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }

  async getAllUsers() {
    const response = await axios.get(API_URL + "users/", {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }

  async getAllProfiles() {
    const response = await axios.get(API_URL + "profiles/", {
      headers: authService.getAuthHeader()
    });
    return response.data;
  }
}

export default new UserService();