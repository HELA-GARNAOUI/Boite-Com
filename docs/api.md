# API Specification

## Technology Stack
- **Framework:** Django REST Framework
- **Authentication:** JWT
- **Documentation:** Swagger/OpenAPI
- **Database:** PostgreSQL
- **Caching:** Redis
- **Odoo Integration:** XML-RPC/JSON-RPC

## Odoo Integration Endpoints

### GET /api/odoo/sync/
- **Description:** Sync data between custom API and Odoo
- **Headers:** Authorization: Bearer {token}
- **Response:** Sync status and results

### POST /api/odoo/webhook/
- **Description:** Webhook endpoint for Odoo events
- **Headers:** X-Odoo-Signature
- **Response:** Success message

## Custom Features API (Not in Odoo)

### SEO Analytics API

#### GET /api/analytics/seo/
- **Description:** Get SEO metrics and recommendations
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - start_date: date
  - end_date: date
- **Response:** SEO performance data and AI recommendations

#### POST /api/analytics/seo/audit/
- **Description:** Run SEO audit
- **Headers:** Authorization: Bearer {token}
- **Request Body:**
  ```json
  {
    "url": "string",
    "keywords": ["string"],
    "competitors": ["string"]
  }
  ```
- **Response:** Audit results with AI-powered recommendations

### Social Media Management API

#### GET /api/social/analytics/
- **Description:** Get social media performance metrics
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - platform: string
  - start_date: date
  - end_date: date
- **Response:** Social media performance data

#### POST /api/social/schedule/
- **Description:** Schedule social media posts
- **Headers:** Authorization: Bearer {token}
- **Request Body:**
  ```json
  {
    "platform": "string",
    "content": "string",
    "media": ["string"],
    "scheduled_time": "datetime",
    "target_audience": {}
  }
  ```
- **Response:** Scheduled post details

### AI-Powered Marketing API

#### POST /api/ai/analyze/
- **Description:** Analyze marketing data with AI
- **Headers:** Authorization: Bearer {token}
- **Request Body:**
  ```json
  {
    "data_type": "string",
    "data": {},
    "analysis_type": "string"
  }
  ```
- **Response:** AI analysis results

#### GET /api/ai/recommendations/
- **Description:** Get AI-powered marketing recommendations
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - category: string
  - client_id: string
- **Response:** Personalized recommendations

### Client Portal API

#### GET /api/portal/dashboard/
- **Description:** Get client dashboard data
- **Headers:** Authorization: Bearer {token}
- **Response:** Combined data from custom API and Odoo

#### GET /api/portal/reports/
- **Description:** Get custom reports
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - type: string
  - period: string
- **Response:** Custom report data

## Authentication Endpoints

### POST /api/auth/login/
- **Description:** User login (integrates with Odoo auth)
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** JWT tokens and Odoo session info

### POST /api/auth/refresh/
- **Description:** Refresh JWT token
- **Request Body:**
  ```json
  {
    "refresh": "string"
  }
  ```
- **Response:** New access token

### POST /api/auth/logout/
- **Description:** User logout (both custom API and Odoo)
- **Headers:** Authorization: Bearer {token}
- **Response:** Success message

## Blog API

### GET /api/blog/posts/
- **Description:** List blog posts
- **Query Parameters:**
  - page: int
  - category: string
  - search: string
  - sort: string
- **Response:** Paginated list of posts

### GET /api/blog/posts/{id}/
- **Description:** Get single blog post
- **Response:** Post details

## Analytics API

### GET /api/analytics/seo/
- **Description:** Get SEO metrics
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - start_date: date
  - end_date: date
- **Response:** SEO performance data

### GET /api/analytics/social/
- **Description:** Get social media metrics
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - platform: string
  - start_date: date
  - end_date: date
- **Response:** Social media performance data

## Project Management API

### GET /api/projects/
- **Description:** List projects
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - status: string
  - client: string
  - sort: string
- **Response:** Paginated list of projects

### GET /api/projects/{id}/
- **Description:** Get project details
- **Headers:** Authorization: Bearer {token}
- **Response:** Project details

## File Management API

### POST /api/files/upload/
- **Description:** Upload file
- **Headers:** Authorization: Bearer {token}
- **Request Body:** multipart/form-data
- **Response:** File details

### GET /api/files/{id}/
- **Description:** Get file details
- **Headers:** Authorization: Bearer {token}
- **Response:** File information

### DELETE /api/files/{id}/
- **Description:** Delete file
- **Headers:** Authorization: Bearer {token}
- **Response:** Success message

## Notification API

### GET /api/notifications/
- **Description:** List notifications
- **Headers:** Authorization: Bearer {token}
- **Query Parameters:**
  - read: boolean
  - type: string
- **Response:** Paginated list of notifications

### PUT /api/notifications/{id}/read/
- **Description:** Mark notification as read
- **Headers:** Authorization: Bearer {token}
- **Response:** Updated notification

## Settings API

### GET /api/settings/
- **Description:** Get user settings
- **Headers:** Authorization: Bearer {token}
- **Response:** User preferences

### PUT /api/settings/
- **Description:** Update user settings
- **Headers:** Authorization: Bearer {token}
- **Request Body:**
  ```json
  {
    "language": "string",
    "theme": "string",
    "notifications": {
      "email": boolean,
      "push": boolean
    }
  }
  ```

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {},
    "odoo_error": {} // If error is from Odoo
  }
}
```

### Common Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error
- 502: Odoo Connection Error

## Rate Limiting

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users
- Rate limit headers included in response

## Security

### Headers
- CORS configuration
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security

### Data Validation
- Input sanitization
- Request size limits
- File type validation
- SQL injection prevention
- Odoo data validation

## Caching Strategy

### Cache Headers
- Cache-Control
- ETag
- Last-Modified

### Cache Duration
- Static content: 1 week
- Dynamic content: 1 hour
- User-specific data: No cache
- Odoo data: 5 minutes
