from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ServiceListView(APIView):
    def get(self, request):
        # Placeholder service data
        data = [
            {"id": 1, "name": "Service 1"},
            {"id": 2, "name": "Service 2"}
        ]
        return Response(data, status=status.HTTP_200_OK) 