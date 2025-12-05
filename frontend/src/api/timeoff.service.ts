import api from './axios';

export interface TimeOffRequest {
  id?: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  type: 'VACATION' | 'SICK' | 'PERSONAL' | 'OTHER';
}

export const timeOffService = {
  async getAllRequests(): Promise<TimeOffRequest[]> {
    const response = await api.get<TimeOffRequest[]>('/timeoff');
    return response.data;
  },

  async getMyRequests(): Promise<TimeOffRequest[]> {
    const response = await api.get<TimeOffRequest[]>('/timeoff/my-requests');
    return response.data;
  },

  async createRequest(request: Partial<TimeOffRequest>): Promise<TimeOffRequest> {
    const response = await api.post<TimeOffRequest>('/timeoff', request);
    return response.data;
  },

  async updateRequestStatus(id: number, status: string): Promise<TimeOffRequest> {
    const response = await api.put<TimeOffRequest>(`/timeoff/${id}/status`, { status });
    return response.data;
  },

  async deleteRequest(id: number): Promise<void> {
    await api.delete(`/timeoff/${id}`);
  },
};