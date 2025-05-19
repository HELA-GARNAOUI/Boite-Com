from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        service = self.get_object()
        new_status = request.data.get('status')
        
        if new_status not in dict(Service.STATUS_CHOICES):
            return Response({'error': 'Invalid status'}, status=400)
            
        service.status = new_status
        service.save()
        
        return Response(self.get_serializer(service).data) 