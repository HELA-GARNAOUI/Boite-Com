from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class MarketingListView(APIView):
    def get(self, request):
        # Placeholder marketing data
        data = [
            {"id": 1, "name": "Marketing 1"},
            {"id": 2, "name": "Marketing 2"}
        ]
        return Response(data, status=status.HTTP_200_OK) 