import axios from "axios";
import authService from "./auth.service";

const API_URL = "/api/items/";

class ItemService {
  async getAllItems() {
    try {
      const response = await axios.get(API_URL, {
        headers: authService.getAuthHeader(),
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async getItemById(id) {
    try {
      const response = await axios.get(API_URL + id + "/", {
        headers: authService.getAuthHeader(),
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching item ${id}:`, error);
      throw error;
    }
  }

  async createItem(item) {
    try {
      const headers = authService.getAuthHeader();
      console.log('Creating item with headers:', headers);
      console.log('Item data:', item);
      
      const response = await axios.post(API_URL, item, {
        headers: headers,
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Item creation error:', error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }

  async updateItem(id, item) {
    try {
      const response = await axios.put(API_URL + id + "/", item, {
        headers: authService.getAuthHeader(),
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${id}:`, error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  }

  async deleteItem(id) {
    try {
      const response = await axios.delete(API_URL + id + "/", {
        headers: authService.getAuthHeader(),
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }
}

export default new ItemService();