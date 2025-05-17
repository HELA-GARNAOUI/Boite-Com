from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ContentListView(APIView):
    def get(self, request):
        # Placeholder content data
        data = [
            {"id": 1, "title": "Sample Content 1"},
            {"id": 2, "title": "Sample Content 2"}
        ]
        return Response(data, status=status.HTTP_200_OK) 