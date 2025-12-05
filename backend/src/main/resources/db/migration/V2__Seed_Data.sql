-- Insert employees with BCrypt hashed passwords (Admin123!)
-- Insert managers first (those without manager_id)
INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP001', 'admin@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', '+1234567890', '1985-01-15', 'Male', 'IT', 'System Administrator', NULL, '2020-01-01', 90000.00, '123 Admin St', 'New York', 'NY', '10001', 'USA', true, 'ADMIN');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP002', 'sarah.johnson@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sarah', 'Johnson', '+1234567891', '1988-03-22', 'Female', 'HR', 'HR Manager', NULL, '2020-02-01', 85000.00, '456 HR Ave', 'New York', 'NY', '10002', 'USA', true, 'MANAGER');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP004', 'michael.chen@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Michael', 'Chen', '+1234567893', '1987-07-18', 'Male', 'Engineering', 'Engineering Manager', NULL, '2020-03-01', 95000.00, '321 Tech Blvd', 'San Francisco', 'CA', '94102', 'USA', true, 'MANAGER');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP008', 'robert.brown@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Robert', 'Brown', '+1234567897', '1986-04-20', 'Male', 'Sales', 'Sales Manager', NULL, '2020-04-01', 88000.00, '258 Sales Pkwy', 'Chicago', 'IL', '60601', 'USA', true, 'MANAGER');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP011', 'patricia.rodriguez@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Patricia', 'Rodriguez', '+1234567900', '1987-10-05', 'Female', 'Marketing', 'Marketing Manager', NULL, '2020-05-01', 87000.00, '852 Brand Rd', 'Los Angeles', 'CA', '90001', 'USA', true, 'MANAGER');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP013', 'amanda.taylor@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Amanda', 'Taylor', '+1234567902', '1988-01-28', 'Female', 'Finance', 'Finance Manager', NULL, '2020-06-01', 92000.00, '159 Money St', 'Boston', 'MA', '02101', 'USA', true, 'MANAGER');

-- Now insert employees with manager references
INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP003', 'john.doe@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John', 'Doe', '+1234567892', '1990-05-10', 'Male', 'HR', 'HR Specialist', 2, '2021-03-15', 65000.00, '789 Employee Rd', 'New York', 'NY', '10003', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP005', 'emily.davis@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Emily', 'Davis', '+1234567894', '1992-09-25', 'Female', 'Engineering', 'Senior Software Engineer', 4, '2021-04-10', 95000.00, '654 Code St', 'San Francisco', 'CA', '94103', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP006', 'david.wilson@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'David', 'Wilson', '+1234567895', '1991-11-30', 'Male', 'Engineering', 'Software Engineer', 4, '2021-06-01', 80000.00, '987 Dev Lane', 'San Francisco', 'CA', '94104', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP007', 'lisa.anderson@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Lisa', 'Anderson', '+1234567896', '1993-02-14', 'Female', 'Engineering', 'Junior Software Engineer', 4, '2022-01-15', 65000.00, '147 Junior Dr', 'San Francisco', 'CA', '94105', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP009', 'jennifer.garcia@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jennifer', 'Garcia', '+1234567898', '1989-06-08', 'Female', 'Sales', 'Sales Representative', 8, '2021-05-20', 70000.00, '369 Rep St', 'Chicago', 'IL', '60602', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP010', 'james.martinez@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'James', 'Martinez', '+1234567899', '1994-08-12', 'Male', 'Sales', 'Sales Representative', 8, '2022-02-10', 68000.00, '741 Seller Ave', 'Chicago', 'IL', '60603', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP012', 'christopher.lee@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Christopher', 'Lee', '+1234567901', '1991-12-18', 'Male', 'Marketing', 'Marketing Specialist', 11, '2021-07-01', 72000.00, '963 Marketing Ln', 'Los Angeles', 'CA', '90002', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP014', 'daniel.thomas@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Daniel', 'Thomas', '+1234567903', '1992-03-16', 'Male', 'Finance', 'Financial Analyst', 13, '2021-08-15', 75000.00, '357 Finance Ave', 'Boston', 'MA', '02102', 'USA', true, 'EMPLOYEE');

INSERT INTO employees (employee_code, email, password, first_name, last_name, phone, date_of_birth, gender, department, position, manager_id, hire_date, salary, address, city, state, zip_code, country, is_active, role) 
VALUES ('EMP015', 'jessica.white@company.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jessica', 'White', '+1234567904', '1993-05-22', 'Female', 'Finance', 'Accountant', 13, '2022-03-01', 68000.00, '753 Ledger Ln', 'Boston', 'MA', '02103', 'USA', true, 'EMPLOYEE');

-- Insert time off requests
INSERT INTO time_off_requests (employee_id, leave_type, start_date, end_date, total_days, reason, status, approved_by, approved_at) VALUES
(5, 'VACATION', '2024-01-15', '2024-01-22', 8, 'Family vacation to Hawaii', 'APPROVED', 4, '2024-01-05 10:30:00'),
(6, 'SICK_LEAVE', '2024-02-10', '2024-02-11', 2, 'Medical appointment and recovery', 'APPROVED', 4, '2024-02-09 14:20:00'),
(7, 'VACATION', '2024-03-01', '2024-03-05', 5, 'Spring break trip', 'APPROVED', 4, '2024-02-20 09:15:00'),
(9, 'PERSONAL', '2024-04-12', '2024-04-14', 3, 'Personal matters', 'PENDING', NULL, NULL),
(10, 'VACATION', '2024-05-20', '2024-05-27', 8, 'Summer vacation', 'REJECTED', 8, '2024-05-10 11:00:00'),
(12, 'VACATION', '2024-06-10', '2024-06-17', 8, 'Travel to Europe', 'PENDING', NULL, NULL),
(14, 'SICK_LEAVE', '2024-07-03', '2024-07-03', 1, 'Not feeling well', 'APPROVED', 13, '2024-07-03 08:00:00'),
(3, 'PERSONAL', '2024-08-15', '2024-08-15', 1, 'Family event', 'PENDING', NULL, NULL);

-- Update rejection reason for rejected request
UPDATE time_off_requests SET rejection_reason = 'Overlapping with critical sales period' WHERE employee_id = 10 AND leave_type = 'VACATION';
