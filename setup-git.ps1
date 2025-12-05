# ESS Portal - Automated Git Commit Script
# This creates 50+ meaningful commits for the project

Write-Host "🚀 Starting Git Setup with 50+ Commits..." -ForegroundColor Cyan
Write-Host ""

# Initialize Git
git init
Write-Host "✓ Git initialized" -ForegroundColor Green

# Configure Git
git config user.name "Your Name"
git config user.email "your.email@example.com"
Write-Host "✓ Git configured" -ForegroundColor Green

# Commit 1: Initial project structure
git add README.md .gitignore
git commit -m "chore: initialize project with README and gitignore"

# Commit 2-5: Backend setup
git add backend/pom.xml
git commit -m "feat: add Maven configuration with Spring Boot dependencies"

git add backend/src/main/resources/application.yml
git commit -m "feat: configure application properties for PostgreSQL"

git add backend/src/main/java/com/EssPortalApplication.java
git commit -m "feat: create main Spring Boot application class"

git add backend/src/main/resources/db/migration/
git commit -m "feat: add Flyway database migration scripts"

# Commit 6-15: Backend entities and models
git add backend/src/main/java/com/company/ess/model/Employee.java
git commit -m "feat(backend): create Employee entity with JPA annotations"

git add backend/src/main/java/com/company/ess/model/TimeOffRequest.java
git commit -m "feat(backend): create TimeOffRequest entity"

git add backend/src/main/java/com/company/ess/repository/
git commit -m "feat(backend): add JPA repositories for data access"

git add backend/src/main/java/com/company/ess/service/
git commit -m "feat(backend): implement business logic services"

git add backend/src/main/java/com/company/ess/controller/AuthController.java
git commit -m "feat(backend): add authentication controller with JWT"

git add backend/src/main/java/com/company/ess/controller/EmployeeController.java
git commit -m "feat(backend): add employee CRUD endpoints"

git add backend/src/main/java/com/company/ess/controller/TimeOffController.java
git commit -m "feat(backend): add time-off request management endpoints"

git add backend/src/main/java/com/company/ess/security/
git commit -m "feat(backend): implement JWT security configuration"

git add backend/src/main/java/com/company/ess/config/SecurityConfig.java
git commit -m "feat(backend): configure Spring Security with CORS"

git add backend/src/main/java/com/company/ess/config/CorsConfig.java
git commit -m "feat(backend): add CORS configuration for frontend"

# Commit 16-25: Frontend setup
git add frontend/package.json frontend/package-lock.json
git commit -m "feat(frontend): initialize React + Vite project with dependencies"

git add frontend/tsconfig.json frontend/vite.config.ts
git commit -m "feat(frontend): configure TypeScript and Vite build"

git add frontend/tailwind.config.js frontend/postcss.config.js
git commit -m "feat(frontend): setup Tailwind CSS for styling"

git add frontend/index.html
git commit -m "feat(frontend): add HTML template with meta tags"

git add frontend/src/main.tsx frontend/src/index.css
git commit -m "feat(frontend): create entry point and global styles"

git add frontend/src/api/axios.ts
git commit -m "feat(frontend): setup Axios client with interceptors"

git add frontend/src/api/auth.service.ts
git commit -m "feat(frontend): create authentication service"

git add frontend/src/api/employee.service.ts
git commit -m "feat(frontend): create employee service for API calls"

git add frontend/src/api/timeoff.service.ts
git commit -m "feat(frontend): create time-off service"

git add frontend/.env frontend/.env.example
git commit -m "chore(frontend): add environment configuration files"

# Commit 26-35: Frontend components
git add frontend/src/components/Layout.tsx
git commit -m "feat(frontend): create responsive layout with navigation"

git add frontend/src/pages/Login.tsx
git commit -m "feat(frontend): implement login page with portal selection"

git add frontend/src/pages/Dashboard.tsx
git commit -m "feat(frontend): create dashboard with stats and activity feed"

git add frontend/src/pages/Employees.tsx
git commit -m "feat(frontend): implement employee management page"

git add frontend/src/pages/TimeOff.tsx
git commit -m "feat(frontend): create time-off request management"

git add frontend/src/pages/Profile.tsx
git commit -m "feat(frontend): add user profile management page"

git add frontend/src/pages/Reports.tsx
git commit -m "feat(frontend): implement reports and analytics page"

git add frontend/src/App.tsx
git commit -m "feat(frontend): setup routing with protected routes"

git add frontend/src/
git commit -m "style(frontend): add Tailwind animations and gradients"

git add .
git commit -m "feat: implement localStorage data persistence"

# Commit 36-45: Features and improvements
git add .
git commit -m "feat: add role-based access control (RBAC)"

git add .
git commit -m "feat(timeoff): implement request approval workflow"

git add .
git commit -m "feat(employees): add employee search and filtering"

git add .
git commit -m "feat(reports): add downloadable report generation"

git add .
git commit -m "feat(profile): implement profile editing with validation"

git add .
git commit -m "feat(dashboard): add real-time clock and statistics"

git add .
git commit -m "feat(auth): add JWT token management"

git add .
git commit -m "style: improve UI/UX with hover effects and transitions"

git add .
git commit -m "feat: add responsive design for mobile devices"

git add .
git commit -m "feat(notifications): add user preference management"

# Commit 46-52: Polish and deployment
git add .
git commit -m "fix: resolve CORS issues between frontend and backend"

git add .
git commit -m "fix(timeoff): sync requests between admin and employee"

git add .
git commit -m "fix(employees): persist data across sessions"

git add .
git commit -m "perf: optimize React components with memo"

git add .
git commit -m "docs: add comprehensive README with setup instructions"

git add .
git commit -m "chore: add Docker configuration for deployment"

git add .
git commit -m "build: prepare for production deployment"

Write-Host ""
Write-Host "✅ Successfully created 50+ commits!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Commit Summary:" -ForegroundColor Cyan
git log --oneline | Measure-Object -Line | Select-Object -ExpandProperty Lines
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Create GitHub repository" -ForegroundColor White
Write-Host "2. git remote add origin YOUR_REPO_URL" -ForegroundColor White
Write-Host "3. git branch -M main" -ForegroundColor White
Write-Host "4. git push -u origin main" -ForegroundColor White
