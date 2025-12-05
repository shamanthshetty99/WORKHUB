-- Create employees table
CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    employee_code VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    department VARCHAR(50),
    position VARCHAR(100),
    manager_id BIGINT,
    hire_date DATE,
    salary DECIMAL(12, 2),
    address VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    country VARCHAR(50),
    profile_image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(20) DEFAULT 'EMPLOYEE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Create time_off_requests table
CREATE TABLE time_off_requests (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INTEGER,
    reason TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    approved_by BIGINT,
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employees(id),
    CONSTRAINT fk_approver FOREIGN KEY (approved_by) REFERENCES employees(id),
    CONSTRAINT check_dates CHECK (end_date >= start_date),
    CONSTRAINT check_status CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'))
);

-- Create indexes for better query performance
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_employee_code ON employees(employee_code);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_manager_id ON employees(manager_id);
CREATE INDEX idx_time_off_requests_employee_id ON time_off_requests(employee_id);
CREATE INDEX idx_time_off_requests_status ON time_off_requests(status);
CREATE INDEX idx_time_off_requests_start_date ON time_off_requests(start_date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_time_off_requests_updated_at
    BEFORE UPDATE ON time_off_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();