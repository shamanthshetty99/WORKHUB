import axios from './axios';

export interface LoginResponse {
  token: string;
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axios.post('/auth/login', { email, password });
    const data = response.data;
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    }));
    
    return data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): LoginResponse | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();