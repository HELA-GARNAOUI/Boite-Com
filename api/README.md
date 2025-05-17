# Digital Agency Backend API

This repository contains the backend API implementation for a digital agency platform. The API is built with Django and Django REST Framework and supports various functionalities including user management, digital posture analysis, content management, and more.

## Technology Stack

- **Framework:** Django + Django Rest Framework
- **Database:** PostgreSQL
- **Authentication:** JWT + Odoo Integration
- **Caching:** Redis
- **Task Queue:** Celery
- **AI Integration:** OpenAI API

## Local Development Setup

### Prerequisites

- Python 3.9+
- PostgreSQL
- Redis
- Node.js (for managing scripts)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd digital-agency-backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file by copying the `.env.example`:

```bash
cp .env.example .env
```

5. Update the `.env` file with your configuration settings.

6. Run database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

7. Create a superuser:

```bash
python manage.py createsuperuser
```

8. Start the development server:

```bash
python manage.py runserver
```

9. In a separate terminal, start the Celery worker:

```bash
celery -A core worker -l info
```

10. Access the API at http://localhost:8000/

## API Documentation

API documentation is available at:

- Swagger UI: http://localhost:8000/docs/
- ReDoc: http://localhost:8000/redoc/

## Core APIs

### 1. Authentication & User Management
```
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/refresh/
GET /api/auth/profile/
PUT /api/auth/profile/
```

### 2. Digital Posture Analysis
```
POST /api/analysis/digital-posture/
GET /api/analysis/digital-posture/{client_id}/
GET /api/analysis/recommendations/{client_id}/
POST /api/analysis/generate-action-plan/
```

### 3. Blog & News Management
```
GET /api/content/blog/
GET /api/content/blog/{post_id}/
GET /api/content/news/
GET /api/content/categories/
POST /api/content/blog/
PUT /api/content/blog/{post_id}/
```

### 4. Services Management
```
GET /api/services/
GET /api/services/{service_id}/
GET /api/services/{service_id}/pricing/
GET /api/services/{service_id}/portfolio/
```

### 5. Contact & Communication
```
POST /api/contact/submit/
POST /api/contact/schedule-appointment/
GET /api/contact/location/
```

### 6. Client Dashboard
```
GET /api/dashboard/overview/
GET /api/dashboard/projects/
GET /api/dashboard/invoices/
GET /api/dashboard/analytics/
```

### 7. Marketing Tools
```
GET /api/marketing/seo-score/
GET /api/marketing/competitor-analysis/
GET /api/marketing/social-metrics/
```

## Project Structure

- `core/` - Project configuration and settings
- `users/` - User authentication and management
- `analysis/` - Digital posture analysis and recommendations
- `content/` - Blog and news management
- `services/` - Services and pricing management
- `contact/` - Contact forms and appointment scheduling
- `dashboard/` - Client dashboard APIs
- `marketing/` - Marketing tools and analytics
- `integrations/` - Integration with Odoo, OpenAI, and other services

## Security & Performance

- JWT authentication
- Rate limiting
- CORS configuration
- Redis caching
- Error handling
- Input validation

## Running Tests

```bash
python manage.py test
```

## Deployment

This project can be deployed to various environments. For detailed deployment instructions, refer to the deployment documentation.