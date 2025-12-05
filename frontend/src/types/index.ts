export interface Employee {
  id: number;
  employeeCode: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  department?: string;
  position?: string;
  managerId?: number;
  managerName?: string;
  hireDate?: string;
  salary?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  profileImageUrl?: string;
  isActive?: boolean;
  role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

export interface TimeOffRequest {
  id: number;
  employeeId: number;
  employeeName?: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays?: number;
  reason?: string;
  status: RequestStatus;
  approvedById?: number;
  approvedByName?: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type LeaveType =
  | 'VACATION'
  | 'SICK_LEAVE'
  | 'PERSONAL'
  | 'MATERNITY'
  | 'PATERNITY'
  | 'UNPAID'
  | 'BEREAVEMENT';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  employee: Employee;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}