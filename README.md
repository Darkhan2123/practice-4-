# Item Management System

A simple full-stack application demonstrating role-based permissions (admin, user) with Django REST Framework backend and React frontend.

## Features

- User authentication with token-based auth
- Role-based permissions (admin and user roles)
- CRUD operations for items
- Responsive UI with Bootstrap
- Admin dashboard for system administration

## Backend (Django + DRF)

- Django REST Framework for API
- Custom permissions based on user roles
- Token authentication
- Model relationships and serializers

## Frontend (React)

- React with hooks
- React Router for navigation
- Bootstrap for styling
- Axios for API requests
- Role-based component rendering

## Getting Started

### Backend Setup

1. Install required packages:
   ```
   cd backend
   pip install -r requirements.txt
   ```

2. Run migrations:
   ```
   python manage.py migrate
   ```

3. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

4. Run the server:
   ```
   python manage.py runserver
   ```

### Frontend Setup

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start development server:
   ```
   npm start
   ```

## API Endpoints

- `/api/users/` - User management (admin only)
- `/api/users/register/` - User registration (public)
- `/api/users/me/` - Current user info
- `/api/profiles/` - User profiles (admin only)
- `/api/profiles/my_profile/` - Current user profile
- `/api/items/` - Item management (filtered by permission)
- `/api/token-auth/` - Token authentication

## User Roles

- **Admin**: Can view and manage all users and items
- **User**: Can view only their own items and perform CRUD operations on them

## Screenshots

*Add screenshots here when the application is running*