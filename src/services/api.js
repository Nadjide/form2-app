const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }

  // User endpoints
  async getUsers() {
    return this.makeRequest('/users');
  }

  async createUser(userData) {
    return this.makeRequest('/users', {
      method: 'POST',
      body: JSON.stringify({
        nom: userData.lastName,
        prenom: userData.firstName,
        email: userData.email,
        date_naissance: userData.birthDate,
        pays: 'France',
        ville: userData.city,
        code_postal: userData.postalCode
      }),
    });
  }

  async deleteUser(userId, token) {
    return this.makeRequest(`/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Auth endpoints
  async login(email, password) {
    return this.makeRequest('/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
    });
  }

  // Test connection
  async testConnection() {
    try {
      const health = await this.healthCheck();
      console.log('API Connection:', health);
      return health;
    } catch (error) {
      console.error('API Connection failed:', error);
      return { status: 'error', message: error.message };
    }
  }
}

const apiService = new ApiService();
export default apiService; 