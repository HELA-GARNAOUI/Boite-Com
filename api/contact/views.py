from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ContactListView(APIView):
    def get(self, request):
        # Placeholder contact data
        data = [
            {"id": 1, "name": "Contact 1"},
            {"id": 2, "name": "Contact 2"}
        ]
        return Response(data, status=status.HTTP_200_OK) 