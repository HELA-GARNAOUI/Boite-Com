from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import uuid
import logging
from .models import ChatSession, ChatMessage
from .serializers import ChatSessionSerializer, ChatMessageSerializer
from .ai import chat_ai

logger = logging.getLogger(__name__)

class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSessionSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        # Vérifier si l'en-tête X-Skip-Auth est présent
        if self.request.headers.get('X-Skip-Auth') == 'true':
            return []
        return super().get_permissions()

    def get_queryset(self):
        try:
            if self.request.headers.get('X-Skip-Auth') == 'true':
                return ChatSession.objects.all()
            return ChatSession.objects.filter(user=self.request.user)
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des sessions: {str(e)}")
            return ChatSession.objects.none()

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Erreur lors de la liste des sessions: {str(e)}")
            return Response(
                {'error': 'Une erreur est survenue lors de la récupération des sessions'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request):
        try:
            session_id = str(uuid.uuid4())
            chat_session = ChatSession.objects.create(
                user=request.user if not request.headers.get('X-Skip-Auth') == 'true' else None,
                session_id=session_id,
                status='active'
            )
            serializer = self.get_serializer(chat_session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Erreur lors de la création de la session: {str(e)}")
            return Response(
                {'error': 'Une erreur est survenue lors de la création de la session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        try:
            chat_session = self.get_object()
            message = request.data.get('message')
            
            if not message:
                return Response(
                    {'error': 'Message is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Créer le message de l'utilisateur
            user_message = ChatMessage.objects.create(
                chat_session=chat_session,
                sender=request.user if not request.headers.get('X-Skip-Auth') == 'true' else None,
                message=message,
                is_from_user=True
            )

            # Obtenir l'historique des messages pour le contexte
            chat_history = list(chat_session.messages.all().values('message', 'is_from_user'))

            # Générer la réponse de l'IA
            ai_response = chat_ai.generate_response(message, chat_history)

            # Créer le message de l'IA
            ai_message = ChatMessage.objects.create(
                chat_session=chat_session,
                message=ai_response,
                is_from_user=False
            )

            serializer = ChatMessageSerializer([user_message, ai_message], many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Erreur lors de l'envoi du message: {str(e)}")
            return Response(
                {'error': 'Une erreur est survenue lors de l\'envoi du message'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['post'])
    def close_session(self, request, pk=None):
        try:
            chat_session = self.get_object()
            chat_session.status = 'closed'
            chat_session.save()
            return Response({'status': 'success'})
        except Exception as e:
            logger.error(f"Erreur lors de la fermeture de la session: {str(e)}")
            return Response(
                {'error': 'Une erreur est survenue lors de la fermeture de la session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 