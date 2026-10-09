# Task Management Application

A full-stack Task Management Application built using **React, Django REST Framework, and PostgreSQL**. The application provides user authentication and task management features through a React frontend connected to a REST API backend.

The backend follows a Clean Architecture-style structure, separating business logic, domain repositories, infrastructure implementations, and presentation logic.

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Project Architecture](#project-architecture)
* [Project Structure](#project-structure)
* [Prerequisites](#prerequisites)
* [Installation and Setup](#installation-and-setup)
* [PostgreSQL Configuration](#postgresql-configuration)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [Database Migrations](#database-migrations)
* [API Overview](#api-overview)
* [Authentication](#authentication)
* [Testing](#testing)
* [Security](#security)

---

## Features

### Authentication

* User registration.
* Password-based login.
* Registration OTP generation and verification.
* Login OTP generation and verification.
* JWT-based authentication.
* Frontend authentication state management.
* Protected frontend routes.
* Registration completion workflow.

### Task Management

* Create tasks.
* Retrieve individual tasks.
* List tasks.
* Update existing tasks.
* Mark tasks as completed.
* Delete tasks.
* View tasks through the dashboard and calendar interface.

### Frontend

* React-based user interface.
* Reusable components.
* Centralized API communication using Axios.
* Authentication state management using React Context.
* Protected routes.
* Dashboard, calendar, login, registration, and task form pages.
* Confirmation modal for user actions.

### Backend

* RESTful APIs built with Django REST Framework.
* PostgreSQL database integration.
* JWT token handling.
* Dedicated use cases for application operations.
* Repository pattern for data access.
* Separation of business logic and framework-specific implementations.
* Database migrations.
* Backend test modules.

---

## Technology Stack

| Technology                   | Purpose                        |
| ---------------------------- | ------------------------------ |
| React                        | Frontend UI                    |
| JavaScript / JSX             | Frontend development           |
| Axios                        | HTTP requests                  |
| React Context API            | Authentication state           |
| CSS                          | Styling                        |
| Python                       | Backend programming            |
| Django 6.1.1                 | Backend framework              |
| Django REST Framework 3.18.1 | REST API development           |
| Simple JWT 5.5.1             | JWT authentication integration |
| PyJWT 2.15.1                 | JWT handling                   |
| PostgreSQL                   | Relational database            |
| Psycopg 3.3.6                | PostgreSQL adapter             |
| django-cors-headers 4.9.0    | Cross-origin request handling  |
| python-dotenv 1.2.4          | Environment variable loading   |
| npm                          | Frontend package management    |
| pip                          | Python package management      |

The backend dependency versions are defined in `requirements.txt`.

---

## Project Architecture

The backend follows a Clean Architecture-style organization.

### Presentation Layer

Handles incoming API requests and outgoing responses.

Examples:

* `auth_controller.py`
* `task_controller.py`
* `auth_dependencies.py`
* `task_dependencies.py`
* Response presenters

### Application Layer

Contains use cases that represent the actions users can perform.

**Authentication use cases:**

* `complete_registration.py`
* `login_with_password.py`
* `send_login_otp.py`
* `send_registration_otp.py`
* `verify_login_otp.py`
* `verify_registration_otp.py`

**Task use cases:**

* `create_task.py`
* `get_task.py`
* `list_tasks.py`
* `update_task.py`
* `complete_task.py`
* `delete_task.py`

### Domain Layer

Defines repository interfaces required by application use cases.

Examples:

* `user_repository.py`
* `otp_repository.py`
* `registration_verification_repository.py`
* `task_repository.py`

### Infrastructure Layer

Contains Django-specific repository implementations and supporting services.

Examples:

* `django_user_repository.py`
* `django_otp_repository.py`
* `django_registration_verification_repository.py`
* `django_task_repository.py`
* `django_email_service.py`
* `django_jwt_token_service.py`

### Database Layer

PostgreSQL stores application data. Django's ORM and Psycopg provide database access.

### Benefits

* Separation of concerns.
* Easier maintenance and testing.
* Business logic separated from database implementations.
* Reduced coupling between controllers and data access.
* Improved extensibility.

---

## Project Structure

```text
task-management-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   │
│   │   ├── api/
│   │   │   ├── authApi.js
│   │   │   ├── axios.js
│   │   │   └── taskApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Calender.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── TaskForm.jsx
│   │   │
│   │   └── styles/
│   │       └── calender.css
│   │
│   └── package.json
│
└── backend/
    ├── manage.py
    ├── requirements.txt
    │
    ├── apps/
    │   ├── accounts/
    │   │   ├── application/
    │   │   │   └── use_cases/
    │   │   ├── domain/
    │   │   │   ├── repositories/
    │   │   │   └── services/
    │   │   ├── infrastructure/
    │   │   │   ├── repositories/
    │   │   │   └── services/
    │   │   ├── presentation/
    │   │   │   ├── controllers/
    │   │   │   └── presenters/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── tests.py
    │   │
    │   ├── tasks/
    │   │   ├── application/
    │   │   │   └── use_cases/
    │   │   ├── domain/
    │   │   │   └── repositories/
    │   │   ├── infrastructure/
    │   │   │   └── repositories/
    │   │   ├── presentation/
    │   │   │   └── controllers/
    │   │   ├── migrations/
    │   │   ├── models.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── tests.py
    │   │
    │   └── common/
    │       └── presentation/
    │           └── presenters/
    │
    └── config/
        ├── settings.py
        ├── urls.py
        ├── asgi.py
        └── wsgi.py
```

*Note: Update the top-level folder names to match your actual repository. The tree above summarizes the supplied source structure and omits generated files, virtual environments, and third-party dependencies.*

---

## Prerequisites

Install the following before running the application:

* Python compatible with your pinned Django dependencies.
* Node.js and npm.
* PostgreSQL.
* Git.
* A code editor such as Visual Studio Code.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows Command Prompt:

```bat
venv\Scripts\activate
```

On Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Configure PostgreSQL

Create a PostgreSQL database and database user, or use an existing development database.

Open the PostgreSQL shell:

```bash
psql -U postgres
```

Create a database:

```sql
CREATE DATABASE task_management_db;
```

Optionally, create a dedicated database user:

```sql
CREATE USER task_management_user WITH PASSWORD 'change_this_password';
GRANT ALL PRIVILEGES ON DATABASE task_management_db TO task_management_user;
```

Connect to the database and configure schema privileges if required by your PostgreSQL version:

```sql
\c task_management_db
GRANT USAGE, CREATE ON SCHEMA public TO task_management_user;
```

Exit PostgreSQL:

```sql
\q
```

Use your actual database name, username, password, host, and port in the Django configuration.

### 4. Configure Environment Variables

Create a `.env` file in the backend directory if your settings load configuration from that file.

Example:

```dotenv
SECRET_KEY=replace_with_a_secure_django_secret
DEBUG=True

DB_NAME=task_management_db
DB_USER=task_management_user
DB_PASSWORD=change_this_password
DB_HOST=localhost
DB_PORT=5432
```

These variable names are examples. Make sure they match the names read by your `config/settings.py`.

If your project requires email credentials for OTP delivery, configure the relevant email environment variables as well.

**Important:** Never commit real credentials, secret keys, or production environment files to Git.

### 5. Apply Database Migrations

From the backend directory, run:

```bash
python manage.py makemigrations
python manage.py migrate
```

Create an administrator account if Django admin access is configured:

```bash
python manage.py createsuperuser
```

### 6. Set Up the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Configure the frontend API base URL in the location expected by your Axios configuration, such as `src/api/axios.js`.

For example, if the frontend uses Vite environment variables:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Use the variable name actually referenced by your frontend code.

---

## Running the Application

### Start the Backend

From the backend directory:

```bash
python manage.py runserver
```

The Django development server is available at:

```text
http://127.0.0.1:8000/
```

### Start the Frontend

From the frontend directory:

```bash
npm run dev
```

Open the local URL printed by the frontend development server in your browser.

Keep both development servers running while using the application.

---

## Database Migrations

Django migrations synchronize model changes with the PostgreSQL database schema.

Create migrations after changing models:

```bash
python manage.py makemigrations
```

Apply migrations:

```bash
python manage.py migrate
```

Check migration status:

```bash
python manage.py showmigrations
```

Do not delete existing migration files to resolve schema issues without first understanding the consequences for the database.

---

## API Overview

The backend exposes REST API endpoints for authentication and task management.

The exact endpoint URLs and HTTP methods are defined in the project's URL configuration and controllers.

| Operation               | Purpose                               |
| ----------------------- | ------------------------------------- |
| Registration            | Register a new user                   |
| Registration OTP        | Generate and verify registration OTPs |
| Login OTP               | Generate and verify login OTPs        |
| Password login          | Authenticate with credentials         |
| Registration completion | Complete the registration workflow    |
| Create task             | Add a new task                        |
| List tasks              | Retrieve tasks                        |
| Get task                | Retrieve a specific task              |
| Update task             | Modify task information               |
| Complete task           | Mark a task as completed              |
| Delete task             | Remove a task                         |

The frontend API modules are organized as follows:

* `authApi.js` — authentication-related requests.
* `taskApi.js` — task-related requests.
* `axios.js` — shared HTTP client configuration.

Refer to `apps/accounts/urls.py`, `apps/tasks/urls.py`, and `config/urls.py` for the actual endpoint paths.

---

## Authentication

The application uses JWT-related dependencies, including Django REST Framework Simple JWT.

The frontend includes an authentication context and a protected route component. These are used to manage authentication state and restrict access to protected frontend pages.

A typical authenticated request includes an access token in the HTTP authorization header:

```http
Authorization: Bearer <access_token>
```

The exact token issuance, refresh, storage, and expiration behavior depends on the project's implementation and Django REST Framework authentication settings.

Frontend route protection should be complemented by backend authentication and authorization checks. Protecting a page in React alone does not secure its API endpoints.

---

## Testing

The backend contains test modules for accounts and tasks.

Run the Django test suite from the backend directory:

```bash
python manage.py test
```

Run tests for individual applications:

```bash
python manage.py test apps.accounts
python manage.py test apps.tasks
```

Ensure that your test database configuration is valid and that tests do not depend on production data or credentials.

---

## Security

Before deploying the application:

* Set `DEBUG=False`.
* Use a strong, unique Django `SECRET_KEY`.
* Store database credentials and email credentials in environment variables.
* Configure `ALLOWED_HOSTS` for the intended deployment.
* Configure CORS to allow only trusted frontend origins.
* Use HTTPS in production.
* Apply appropriate backend authentication and permission checks.
* Validate incoming data through serializers or equivalent validation logic.
* Protect OTP generation and verification endpoints against abuse.
* Use appropriate access-token expiration and refresh policies.
* Never commit `.env`, virtual environments, `node_modules`, or secret files.
* Use a dedicated database user with only the required privileges.

---

## Troubleshooting

### PostgreSQL Connection Error

Check that PostgreSQL is running and that the database name, username, password, host, and port match your Django configuration.

### Missing Dependencies

Activate the backend virtual environment and run:

```bash
pip install -r requirements.txt
```

### Database Schema Errors

Apply pending migrations:

```bash
python manage.py migrate
```

### Frontend Cannot Reach the Backend

Verify that:

* Django is running.
* The frontend API base URL is correct.
* The configured API paths match the backend URL configuration.
* CORS permits the frontend origin.
* Authentication headers are included where required.

### Authentication Errors

Check token expiration, token handling in the Axios configuration, backend authentication settings, and the response from the authentication endpoint.

---

## Future Improvements

Potential enhancements include:

* Task filtering, sorting, and search.
* Pagination for larger task lists.
* More detailed task status and priority management.
* Task reminders and notifications.
* Automated backend and frontend tests.
* Docker-based development and deployment.
* CI/CD integration.
* Production logging and monitoring.
* API documentation using an OpenAPI-compatible tool.

---

## License

Add the license applicable to this project before distributing or publishing the repository.

---

## Author

**Prithviraj P U**

Full Stack Development Project

Built with React, Django REST Framework, and PostgreSQL.
