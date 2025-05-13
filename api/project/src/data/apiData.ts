import { ApiDoc } from '../types/api';

export const apiDocumentation: ApiDoc = {
  title: 'Marketing Agency API',
  version: '1.0.0',
  description: 'API for marketing agency operations with Odoo integration, SEO analytics, social media management, and AI-powered marketing features.',
  categories: [
    {
      name: 'Authentication',
      description: 'Endpoints for user authentication and session management',
      endpoints: [
        {
          path: '/api/auth/login/',
          method: 'POST',
          description: 'User login (integrates with Odoo auth)',
          requestBody: {
            contentType: 'application/json',
            schema: {
              email: 'string',
              password: 'string'
            },
            example: JSON.stringify({
              email: 'user@example.com',
              password: 'password123'
            }, null, 2)
          },
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              odoo_session: {
                session_id: 'abc123def456',
                expires_at: '2025-01-15T12:00:00Z'
              }
            }, null, 2)
          }
        },
        {
          path: '/api/auth/refresh/',
          method: 'POST',
          description: 'Refresh JWT token',
          requestBody: {
            contentType: 'application/json',
            schema: {
              refresh: 'string'
            },
            example: JSON.stringify({
              refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }, null, 2)
          },
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }, null, 2)
          }
        },
        {
          path: '/api/auth/logout/',
          method: 'POST',
          description: 'User logout (both custom API and Odoo)',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              message: 'Successfully logged out'
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'Odoo Integration',
      description: 'Endpoints for integrating with Odoo ERP',
      endpoints: [
        {
          path: '/api/odoo/sync/',
          method: 'GET',
          description: 'Sync data between custom API and Odoo',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              status: 'success',
              sync_time: '2025-01-15T10:30:00Z',
              details: {
                created: 5,
                updated: 12,
                deleted: 2
              }
            }, null, 2)
          }
        },
        {
          path: '/api/odoo/webhook/',
          method: 'POST',
          description: 'Webhook endpoint for Odoo events',
          headers: {
            'X-Odoo-Signature': 'hash_signature'
          },
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              message: 'Webhook processed successfully'
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'SEO Analytics',
      description: 'Endpoints for SEO metrics and recommendations',
      endpoints: [
        {
          path: '/api/analytics/seo/',
          method: 'GET',
          description: 'Get SEO metrics and recommendations',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          queryParams: [
            {
              name: 'start_date',
              type: 'date',
              description: 'Start date for SEO metrics',
              required: true
            },
            {
              name: 'end_date',
              type: 'date',
              description: 'End date for SEO metrics',
              required: true
            }
          ],
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              metrics: {
                organic_traffic: 12500,
                keywords_ranking: 350,
                average_position: 15.3,
                impressions: 45000,
                clicks: 3800
              },
              recommendations: [
                {
                  title: 'Optimize meta descriptions',
                  priority: 'high',
                  impact: 8.5,
                  details: 'Update meta descriptions to improve CTR'
                },
                {
                  title: 'Fix broken links',
                  priority: 'medium',
                  impact: 6.2,
                  details: 'Found 23 broken links on key pages'
                }
              ]
            }, null, 2)
          }
        },
        {
          path: '/api/analytics/seo/audit/',
          method: 'POST',
          description: 'Run SEO audit',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          requestBody: {
            contentType: 'application/json',
            schema: {
              url: 'string',
              keywords: 'string[]',
              competitors: 'string[]'
            },
            example: JSON.stringify({
              url: 'https://example.com',
              keywords: ['digital marketing', 'seo services'],
              competitors: ['competitor1.com', 'competitor2.com']
            }, null, 2)
          },
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              audit_id: 'audit_12345',
              completion_time: '10 minutes',
              status: 'processing'
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'Social Media Management',
      description: 'Endpoints for managing social media platforms',
      endpoints: [
        {
          path: '/api/social/analytics/',
          method: 'GET',
          description: 'Get social media performance metrics',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          queryParams: [
            {
              name: 'platform',
              type: 'string',
              description: 'Social media platform (e.g., facebook, instagram)',
              required: true
            },
            {
              name: 'start_date',
              type: 'date',
              description: 'Start date for analytics',
              required: true
            },
            {
              name: 'end_date',
              type: 'date',
              description: 'End date for analytics',
              required: true
            }
          ],
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              platform: 'instagram',
              period: '2024-12-01 to 2025-01-01',
              metrics: {
                followers: 5600,
                follower_growth: 320,
                engagement_rate: 3.2,
                impressions: 85000,
                reach: 65000,
                clicks: 4200
              },
              top_posts: [
                {
                  id: 'post_12345',
                  url: 'https://instagram.com/p/abc123',
                  likes: 1250,
                  comments: 85,
                  shares: 32
                }
              ]
            }, null, 2)
          }
        },
        {
          path: '/api/social/schedule/',
          method: 'POST',
          description: 'Schedule social media posts',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          requestBody: {
            contentType: 'application/json',
            schema: {
              platform: 'string',
              content: 'string',
              media: 'string[]',
              scheduled_time: 'datetime',
              target_audience: 'object'
            },
            example: JSON.stringify({
              platform: 'instagram',
              content: 'Check out our new product launch! #newproduct #launch',
              media: ['https://example.com/images/product.jpg'],
              scheduled_time: '2025-01-20T14:30:00Z',
              target_audience: {
                age_range: '25-34',
                locations: ['New York', 'Los Angeles'],
                interests: ['technology', 'marketing']
              }
            }, null, 2)
          },
          response: {
            status: 201,
            contentType: 'application/json',
            example: JSON.stringify({
              schedule_id: 'sched_67890',
              status: 'scheduled',
              platform: 'instagram',
              scheduled_time: '2025-01-20T14:30:00Z'
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'AI-Powered Marketing',
      description: 'Endpoints for AI marketing analysis and recommendations',
      endpoints: [
        {
          path: '/api/ai/analyze/',
          method: 'POST',
          description: 'Analyze marketing data with AI',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          requestBody: {
            contentType: 'application/json',
            schema: {
              data_type: 'string',
              data: 'object',
              analysis_type: 'string'
            },
            example: JSON.stringify({
              data_type: 'campaign_performance',
              data: {
                campaign_id: 'camp_12345',
                metrics: {
                  impressions: 125000,
                  clicks: 7500,
                  conversions: 350,
                  cost: 3500
                }
              },
              analysis_type: 'optimization'
            }, null, 2)
          },
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              analysis_id: 'analysis_54321',
              results: {
                performance_score: 7.8,
                roi: 320,
                cpa: 10,
                opportunities: [
                  {
                    title: 'Adjust bidding strategy',
                    impact: 'high',
                    description: 'Increase bids for high-converting keywords'
                  },
                  {
                    title: 'Optimize ad creative',
                    impact: 'medium',
                    description: 'Current CTR is below benchmark'
                  }
                ]
              }
            }, null, 2)
          }
        },
        {
          path: '/api/ai/recommendations/',
          method: 'GET',
          description: 'Get AI-powered marketing recommendations',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          queryParams: [
            {
              name: 'category',
              type: 'string',
              description: 'Recommendation category (e.g., content, ads, email)',
              required: true
            },
            {
              name: 'client_id',
              type: 'string',
              description: 'Client ID for personalized recommendations',
              required: true
            }
          ],
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              recommendations: [
                {
                  category: 'content',
                  title: 'Increase blog frequency',
                  confidence: 0.87,
                  reasoning: 'Analysis shows higher engagement with regular content',
                  suggested_action: 'Publish 2 blog posts per week focused on SEO topics'
                },
                {
                  category: 'ads',
                  title: 'Reallocate ad budget',
                  confidence: 0.92,
                  reasoning: 'Google Ads outperforming Facebook for this client',
                  suggested_action: 'Shift 30% of Facebook budget to Google Search'
                }
              ]
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'Client Portal',
      description: 'Endpoints for client portal data and reports',
      endpoints: [
        {
          path: '/api/portal/dashboard/',
          method: 'GET',
          description: 'Get client dashboard data',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              client_name: 'Acme Corporation',
              account_manager: 'Jane Smith',
              project_summary: {
                active: 3,
                completed: 12,
                upcoming: 2
              },
              performance_metrics: {
                roi: 320,
                website_traffic: {
                  current: 45000,
                  previous: 32000,
                  change: 40.6
                },
                leads: {
                  current: 250,
                  previous: 180,
                  change: 38.9
                },
                conversion_rate: {
                  current: 3.2,
                  previous: 2.8,
                  change: 14.3
                }
              },
              recent_activities: [
                {
                  type: 'report',
                  title: 'December Campaign Report',
                  date: '2025-01-05T10:30:00Z',
                  status: 'ready'
                },
                {
                  type: 'task',
                  title: 'Website Copy Review',
                  date: '2025-01-02T15:45:00Z',
                  status: 'completed'
                }
              ]
            }, null, 2)
          }
        },
        {
          path: '/api/portal/reports/',
          method: 'GET',
          description: 'Get custom reports',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          queryParams: [
            {
              name: 'type',
              type: 'string',
              description: 'Report type (e.g., seo, ads, social)',
              required: true
            },
            {
              name: 'period',
              type: 'string',
              description: 'Reporting period (e.g., month, quarter, year)',
              required: true
            }
          ],
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              report_id: 'report_12345',
              type: 'seo',
              period: 'month',
              date_range: '2024-12-01 to 2024-12-31',
              metrics: {
                organic_traffic: 35000,
                keywords_ranking: 520,
                backlinks: 1250,
                domain_authority: 42
              },
              top_pages: [
                {
                  url: '/blog/marketing-trends-2025',
                  traffic: 5200,
                  keywords: 35,
                  conversion_rate: 4.2
                },
                {
                  url: '/services/seo',
                  traffic: 3800,
                  keywords: 42,
                  conversion_rate: 6.7
                }
              ],
              pdf_url: 'https://example.com/reports/seo_dec_2024.pdf'
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'Blog',
      description: 'Endpoints for blog management',
      endpoints: [
        {
          path: '/api/blog/posts/',
          method: 'GET',
          description: 'List blog posts',
          queryParams: [
            {
              name: 'page',
              type: 'int',
              description: 'Page number for pagination',
              required: false
            },
            {
              name: 'category',
              type: 'string',
              description: 'Filter by category',
              required: false
            },
            {
              name: 'search',
              type: 'string',
              description: 'Search term',
              required: false
            },
            {
              name: 'sort',
              type: 'string',
              description: 'Sort order (e.g., date_desc, views_desc)',
              required: false
            }
          ],
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              count: 45,
              next: 'https://api.example.com/api/blog/posts/?page=2',
              previous: null,
              results: [
                {
                  id: 'post_12345',
                  title: 'Top 10 SEO Strategies for 2025',
                  slug: 'top-10-seo-strategies-2025',
                  excerpt: 'Discover the most effective SEO strategies that will dominate in 2025...',
                  author: 'John Smith',
                  published_date: '2025-01-10T08:00:00Z',
                  categories: ['SEO', 'Digital Marketing'],
                  tags: ['seo', 'marketing', 'strategies', '2025'],
                  featured_image: 'https://example.com/images/seo-strategies.jpg',
                  read_time: '8 min'
                },
                {
                  id: 'post_12346',
                  title: 'How AI is Transforming Social Media Marketing',
                  slug: 'ai-transforming-social-media-marketing',
                  excerpt: 'Explore how artificial intelligence is revolutionizing social media strategies...',
                  author: 'Jane Doe',
                  published_date: '2025-01-05T10:30:00Z',
                  categories: ['Social Media', 'AI'],
                  tags: ['social media', 'ai', 'marketing'],
                  featured_image: 'https://example.com/images/ai-social.jpg',
                  read_time: '6 min'
                }
              ]
            }, null, 2)
          }
        },
        {
          path: '/api/blog/posts/{id}/',
          method: 'GET',
          description: 'Get single blog post',
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              id: 'post_12345',
              title: 'Top 10 SEO Strategies for 2025',
              slug: 'top-10-seo-strategies-2025',
              content: 'Full HTML content of the blog post...',
              author: {
                id: 'author_789',
                name: 'John Smith',
                bio: 'SEO specialist with 10+ years of experience',
                avatar: 'https://example.com/images/john-smith.jpg'
              },
              published_date: '2025-01-10T08:00:00Z',
              updated_date: '2025-01-12T14:25:00Z',
              categories: ['SEO', 'Digital Marketing'],
              tags: ['seo', 'marketing', 'strategies', '2025'],
              featured_image: 'https://example.com/images/seo-strategies.jpg',
              read_time: '8 min',
              views: 3500,
              related_posts: [
                {
                  id: 'post_12340',
                  title: 'SEO Audit Checklist for 2025',
                  slug: 'seo-audit-checklist-2025'
                }
              ]
            }, null, 2)
          }
        }
      ]
    },
    {
      name: 'File Management',
      description: 'Endpoints for file upload and management',
      endpoints: [
        {
          path: '/api/files/upload/',
          method: 'POST',
          description: 'Upload file',
          headers: {
            'Authorization': 'Bearer {token}',
            'Content-Type': 'multipart/form-data'
          },
          authentication: true,
          response: {
            status: 201,
            contentType: 'application/json',
            example: JSON.stringify({
              file_id: 'file_12345',
              file_name: 'marketing_report.pdf',
              file_size: 2500000,
              mime_type: 'application/pdf',
              upload_date: '2025-01-15T10:30:00Z',
              url: 'https://example.com/files/marketing_report.pdf'
            }, null, 2)
          }
        },
        {
          path: '/api/files/{id}/',
          method: 'GET',
          description: 'Get file details',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          response: {
            status: 200,
            contentType: 'application/json',
            example: JSON.stringify({
              file_id: 'file_12345',
              file_name: 'marketing_report.pdf',
              file_size: 2500000,
              mime_type: 'application/pdf',
              upload_date: '2025-01-15T10:30:00Z',
              last_accessed: '2025-01-16T08:45:00Z',
              download_count: 5,
              url: 'https://example.com/files/marketing_report.pdf',
              uploaded_by: {
                id: 'user_789',
                name: 'John Smith'
              }
            }, null, 2)
          }
        },
        {
          path: '/api/files/{id}/',
          method: 'DELETE',
          description: 'Delete file',
          headers: {
            'Authorization': 'Bearer {token}'
          },
          authentication: true,
          response: {
            status: 204,
            contentType: 'application/json',
            example: JSON.stringify({
              message: 'File deleted successfully'
            }, null, 2)
          }
        }
      ]
    }
  ]
};