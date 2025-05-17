from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class DashboardListView(APIView):
    def get(self, request):
        # Placeholder dashboard data
        data = [
            {"id": 1, "name": "Dashboard 1"},
            {"id": 2, "name": "Dashboard 2"}
        ]
        return Response(data, status=status.HTTP_200_OK) 