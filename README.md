# 🚀 WorkHub - Modern Employee Self-Service Portal

<div align="center">
  <img src="frontend/public/logo.svg" alt="WorkHub Logo" width="150"/>
  
  <h3>Streamline Your Workforce Management</h3>
  
  <p>A comprehensive, full-stack Employee Self-Service Portal built with React, TypeScript, Spring Boot, and PostgreSQL.</p>

  ![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
  ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-6DB33F?logo=spring&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
</div>

---

## ✨ Features

### 👤 Employee Features
- ✅ **Real-time Dashboard** - Live statistics and company insights
- ✅ **Time-Off Management** - Submit and track leave requests
- ✅ **Profile Management** - Update personal information and preferences
- ✅ **Password Security** - Change password with validation
- ✅ **Notification Preferences** - Customize email, SMS, and desktop alerts
- ✅ **Request History** - View all past and current requests

### 👑 Admin Features
- ✅ **Employee Management** - Full CRUD operations (Add/Edit/Delete/View)
- ✅ **Request Approval Workflow** - Approve or reject time-off requests
- ✅ **Advanced Analytics** - Generate 6 types of downloadable reports
- ✅ **Department Insights** - View statistics across departments
- ✅ **Search & Filter** - Quickly find employees and requests
- ✅ **Role-Based Access Control** - Secure, permission-based features

### 📊 Available Reports (Admin Only)
1. **Employee Attendance Report** - Monthly attendance summary
2. **Leave Balance Report** - Current leave balance for all employees
3. **Payroll Summary** - Monthly payroll breakdown
4. **Performance Reviews** - Quarterly performance data
5. **Department Analytics** - Department-wise statistics
6. **Turnover Rate** - Employee retention metrics

## 🎨 Design Highlights

- **Modern UI/UX** - Beautiful gradients and smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Intuitive Navigation** - Easy-to-use interface for all users
- **Professional Branding** - Cohesive WorkHub identity throughout
- **Role-Based Views** - Different experiences for admins and employees

## 🛠️ Tech Stack

<table>
<tr>
<td>

**Frontend**
- React 18.3.1
- TypeScript 5.5
- Vite 5.4
- Tailwind CSS 3.4
- React Router v6
- Axios

</td>
<td>

**Backend**
- Spring Boot 3.2
- Java 17
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL 15
- Flyway Migration

</td>
</tr>
</table>

## 📦 Quick Start

### Prerequisites
```bash
Node.js 20.19+ or 22.12+
Java 17+
PostgreSQL 15+
Maven 3.8+
```

### Backend Setup
```bash
cd backend
# Configure application.yml with your PostgreSQL credentials
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔐 Demo Credentials

| Portal | Email | Password | Role |
|--------|-------|----------|------|
| Admin Portal | admin@company.com | Admin123! | Administrator |
| Employee Portal | john.doe@company.com | Admin123! | Employee |

## 📱 Key Features in Detail

### Dashboard
- Real-time clock with greeting
- Company-wide statistics
- Recent activity feed with user avatars
- Upcoming events calendar
- Quick action buttons (role-based)

### Time-Off Management
- Create requests with multiple types (Vacation, Sick, Personal, Other)
- Date range selection with validation
- Automatic duration calculation
- Status tracking (Pending/Approved/Rejected)
- Admin approval workflow with one-click actions
- Request history with filtering

### Employee Management (Admin)
- Comprehensive employee profiles
- Add new employees with full details
- Edit existing employee information
- Activate/Deactivate employees
- Search across name, email, department
- View detailed employee statistics

### Profile Management
- Edit personal information
- Upload profile picture (avatar with initials)
- Change password with security validation
- Manage notification preferences
  - Email notifications
  - SMS alerts
  - Desktop notifications

### Reports & Analytics (Admin)
- 6 professional report types
- Instant CSV/TXT download
- Real-time data generation
- Department-wise insights
- Performance tracking
- Retention metrics

## 🚀 Deployment

### Vercel (Frontend)
1. Push to GitHub
2. Import project in Vercel
3. Settings:
   - Framework: **Vite**
   - Root Directory: **frontend**
   - Build Command: **npm run build**
   - Output Directory: **dist**
4. Environment Variable:
```
   VITE_API_URL=https://your-backend.railway.app/api
```

### Railway/Render (Backend)
1. Connect GitHub repository
2. Select **backend** folder
3. Build Command: **mvn clean install**
4. Start Command: **java -jar target/*.jar**
5. Environment Variables:
```
   SPRING_DATASOURCE_URL=jdbc:postgresql://...
   SPRING_DATASOURCE_USERNAME=postgres
   SPRING_DATASOURCE_PASSWORD=yourpassword
   JWT_SECRET=your-secret-key
```

## 📊 Project Structure
```
workhub/
├── backend/
│   ├── src/main/java/com/company/ess/
│   │   ├── config/          # Security, CORS configuration
│   │   ├── controller/      # REST API endpoints
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── security/       # JWT implementation
│   │   └── service/        # Business logic
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/   # Flyway SQL scripts
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main app with routing
│   │   └── main.tsx       # Entry point
│   ├── public/
│   │   ├── logo.svg       # WorkHub logo
│   │   └── favicon.svg    # Favicon
│   └── package.json
└── README.md
```

## 🔧 Environment Configuration

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:8080/api
```

**Backend (application.yml)**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ess_portal
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: validate
jwt:
  secret: your-secret-key-here
  expiration: 86400000
```

## 📡 API Documentation

### Authentication
- **POST** `/api/auth/login` - User authentication
- **POST** `/api/auth/logout` - User logout

### Employees (Admin Only)
- **GET** `/api/employees` - List all employees
- **GET** `/api/employees/{id}` - Get employee details
- **POST** `/api/employees` - Create new employee
- **PUT** `/api/employees/{id}` - Update employee
- **DELETE** `/api/employees/{id}` - Delete employee

### Time-Off Requests
- **GET** `/api/timeoff` - Get requests (filtered by role)
- **GET** `/api/timeoff/{id}` - Get request details
- **POST** `/api/timeoff` - Create new request
- **PUT** `/api/timeoff/{id}/status` - Update status (Admin only)
- **DELETE** `/api/timeoff/{id}` - Delete request

## 🎯 Features Roadmap

- [ ] Email notifications for request updates
- [ ] Calendar integration
- [ ] Document upload functionality
- [ ] Mobile app (React Native)
- [ ] Payroll integration
- [ ] Performance review system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Spring Boot](https://spring.io/projects/spring-boot) - Backend framework
- [React](https://react.dev) - Frontend library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Vite](https://vitejs.dev) - Build tool
- [PostgreSQL](https://www.postgresql.org) - Database

---

<div align="center">
  <p>Made with ❤️ for modern workforce management</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
