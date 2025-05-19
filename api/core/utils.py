import logging
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """Custom exception handler for REST framework"""
    # Call REST framework's default exception handler first
    response = drf_exception_handler(exc, context)
    
    # If response is None, there was an unhandled exception
    if response is None:
        logger.error(f"Unhandled exception: {exc}", exc_info=True)
        return Response(
            {
                'error': 'Server error',
                'message': 'An unexpected error occurred. Please try again later.',
                'detail': str(exc) if hasattr(exc, '__str__') else 'Unknown error occurred'
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    # Add more context to the response
    if isinstance(response.data, dict):
        if 'detail' in response.data:
            response.data = {
                'error': response.data['detail'],
                'message': 'An error occurred while processing your request.',
                'status_code': response.status_code
            }
        elif 'non_field_errors' in response.data:
            response.data = {
                'error': response.data['non_field_errors'][0],
                'message': 'Validation error occurred.',
                'status_code': response.status_code
            }
    
    return response