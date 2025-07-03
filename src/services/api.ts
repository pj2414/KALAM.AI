
const API_BASE_URL = 'http://kalamai-backend-production.up.railway.app/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  async register(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  // Content endpoints
  async generateContent(contentData: {
    type: string;
    title: string;
    inputData: any;
    parameters: {
      wordCount: number;
      writingStyle: string;
      tone: string;
      uniqueness: string;
      plagiarismSafety: boolean;
      language: string;
    };
  }) {
    const response = await fetch(`${API_BASE_URL}/content/generate`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(contentData)
    });
    return this.handleResponse(response);
  }

  async getContentHistory() {
    const response = await fetch(`${API_BASE_URL}/content/history`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async deleteContent(id: string) {
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getContent(id: string) {
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateContent(id: string, updates: any) {
    const response = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export default apiService;
