import axios from "axios";

const API_URL = "/api/";

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post("/api/token-auth/", {
        username,
        password
      });
      
      if (response.data.token) {
        // Save user info and token in localStorage
        const userInfo = {
          token: response.data.token,
          username: username
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        // Fetch user profile to get role information
        try {
          const profileResponse = await axios.get(API_URL + "profiles/my_profile/", {
            headers: { Authorization: `Token ${response.data.token}` }
          });
          
          const userWithRole = {
            ...userInfo,
            role: profileResponse.data.role
          };
          localStorage.setItem("user", JSON.stringify(userWithRole));
          
          return userWithRole;
        } catch (profileError) {
          console.error("Error fetching user profile:", profileError);
          // If we can't get profile info, return basic user info
          return userInfo;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async register(username, email, password, firstName, lastName, role = "user") {
    try {
      const response = await axios.post(API_URL + "users/register/", {
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        role
      });
      
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getAuthHeader() {
    const user = this.getCurrentUser();
    
    if (user && user.token) {
      console.log('Using token for auth:', user.token);
      return { 
        'Authorization': `Token ${user.token}`,
        'Content-Type': 'application/json'
      };
    } else {
      console.warn('No authentication token found');
      return { 'Content-Type': 'application/json' };
    }
  }
}

export default new AuthService();