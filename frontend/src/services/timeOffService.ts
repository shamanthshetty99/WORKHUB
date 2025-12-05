import apiClient from './apiClient';
import { TimeOffRequest, PageResponse, RequestStatus } from '@/types';

export const timeOffService = {
  async getAllRequests(page: number = 0, size: number = 10): Promise<PageResponse<TimeOffRequest>> {
    const response = await apiClient.get<PageResponse<TimeOffRequest>>('/time-off-requests', {
      params: { page, size },
    });
    return response.data;
  },

  async getRequestById(id: number): Promise<TimeOffRequest> {
    const response = await apiClient.get<TimeOffRequest>(`/time-off-requests/${id}`);
    return response.data;
  },

  async getRequestsByEmployeeId(
    employeeId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<TimeOffRequest>> {
    const response = await apiClient.get<PageResponse<TimeOffRequest>>(
      `/time-off-requests/employee/${employeeId}`,
      { params: { page, size } }
    );
    return response.data;
  },

  async getRequestsByStatus(
    status: RequestStatus,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<TimeOffRequest>> {
    const response = await apiClient.get<PageResponse<TimeOffRequest>>(
      `/time-off-requests/status/${status}`,
      { params: { page, size } }
    );
    return response.data;
  },

  async createRequest(request: Partial<TimeOffRequest>): Promise<TimeOffRequest> {
    const response = await apiClient.post<TimeOffRequest>('/time-off-requests', request);
    return response.data;
  },

  async updateRequestStatus(
    requestId: number,
    status: RequestStatus,
    approverId?: number,
    rejectionReason?: string
  ): Promise<TimeOffRequest> {
    const params: any = { status };
    if (approverId) params.approverId = approverId;
    if (rejectionReason) params.rejectionReason = rejectionReason;

    const response = await apiClient.patch<TimeOffRequest>(
      `/time-off-requests/${requestId}/status`,
      null,
      { params }
    );
    return response.data;
  },

  async deleteRequest(id: number): Promise<void> {
    await apiClient.delete(`/time-off-requests/${id}`);
  },
};