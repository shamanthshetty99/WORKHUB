import api from './axios';

export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  role: string;
  hireDate: string;
  salary: number;
  isActive: boolean;
}

export const employeeService = {
  async getAllEmployees(): Promise<Employee[]> {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
  },

  async getEmployeeById(id: number): Promise<Employee> {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
  },

  async createEmployee(employee: Partial<Employee>): Promise<Employee> {
    const response = await api.post<Employee>('/employees', employee);
    return response.data;
  },

  async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    const response = await api.put<Employee>(`/employees/${id}`, employee);
    return response.data;
  },

  async deleteEmployee(id: number): Promise<void> {
    await api.delete(`/employees/${id}`);
  },
};