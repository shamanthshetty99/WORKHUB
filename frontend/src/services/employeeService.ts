import apiClient from './apiClient';
import { Employee, PageResponse } from '@/types';

export const employeeService = {
  async getAllEmployees(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'firstName',
    sortDir: string = 'asc'
  ): Promise<PageResponse<Employee>> {
    const response = await apiClient.get<PageResponse<Employee>>('/employees', {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  },

  async searchEmployees(
    query: string,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<Employee>> {
    const response = await apiClient.get<PageResponse<Employee>>('/employees/search', {
      params: { query, page, size },
    });
    return response.data;
  },

  async getEmployeeById(id: number): Promise<Employee> {
    const response = await apiClient.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  async getEmployeeByEmail(email: string): Promise<Employee> {
    const response = await apiClient.get<Employee>(`/employees/email/${email}`);
    return response.data;
  },

  async createEmployee(employee: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.post<Employee>('/employees', employee);
    return response.data;
  },

  async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    const response = await apiClient.put<Employee>(`/employees/${id}`, employee);
    return response.data;
  },

  async deleteEmployee(id: number): Promise<void> {
    await apiClient.delete(`/employees/${id}`);
  },
};