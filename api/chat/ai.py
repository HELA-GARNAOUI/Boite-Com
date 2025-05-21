from typing import List, Dict
import logging
import random
from rapidfuzz import process, fuzz
from openai import OpenAI
from django.conf import settings

logger = logging.getLogger(__name__)

class ChatAI:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        
        # FAQ data structure
        self.faqs = {
            "services": {
                "question": "Quels services proposez-vous ?",
                "answer": "Nous proposons une gamme complète de services digitaux :\n"
                         "• Développement Web\n"
                         "• Marketing Digital\n"
                         "• SEO (Référencement)\n"
                         "• Gestion des réseaux sociaux\n"
                         "• Création de contenu\n"
                         "• Design graphique",
                "keywords": ["services", "offre", "proposez", "proposer", "que faites-vous"]
            },
            "pricing": {
                "question": "Quels sont vos tarifs ?",
                "answer": "Nos tarifs varient selon vos besoins spécifiques. Nous proposons :\n"
                         "• Des forfaits mensuels pour le marketing digital\n"
                         "• Des projets web sur mesure\n"
                         "• Des audits SEO personnalisés\n"
                         "Contactez-nous pour obtenir un devis gratuit adapté à vos besoins.",
                "keywords": ["prix", "tarif", "tarifs", "combien", "coût", "devis"]
            },
            "contact": {
                "question": "Comment vous contacter ?",
                "answer": "Vous pouvez nous contacter de plusieurs façons :\n"
                         "• Par téléphone : +33 1 23 45 67 89\n"
                         "• Par email : contact@boite-com.fr\n"
                         "• Via notre formulaire de contact sur le site\n"
                         "• Ou directement via ce chat !",
                "keywords": ["contact", "contacter", "joindre", "téléphone", "email", "adresse"]
            },
            "process": {
                "question": "Comment se déroule un projet avec vous ?",
                "answer": "Notre processus de travail se déroule en 5 étapes :\n"
                         "1. Consultation initiale et analyse des besoins\n"
                         "2. Proposition et devis détaillé\n"
                         "3. Validation et planification\n"
                         "4. Réalisation du projet\n"
                         "5. Livraison et suivi",
                "keywords": ["processus", "déroulement", "étapes", "comment ça marche", "procédure"]
            },
            "portfolio": {
                "question": "Pouvez-vous me montrer vos réalisations ?",
                "answer": "Bien sûr ! Vous pouvez consulter notre portfolio sur notre site web.\n"
                         "Il contient des exemples de nos projets en :\n"
                         "• Sites web\n"
                         "• Campagnes marketing\n"
                         "• Stratégies SEO\n"
                         "• Design graphique",
                "keywords": ["portfolio", "réalisations", "projets", "exemples", "travaux"]
            }
        }

        # Default responses for other intents
        self.responses = {
            "greeting": [
                "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
                "Bonjour ! Je suis ravi de vous aider. Que souhaitez-vous savoir ?",
                "Bonjour ! Comment puis-je vous assister aujourd'hui ?"
            ],
            "farewell": [
                "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions.",
                "À bientôt ! N'hésitez pas à nous contacter si vous avez besoin d'aide.",
                "Merci de votre visite ! À bientôt !"
            ],
            "thanks": [
                "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.",
                "C'est un plaisir ! N'hésitez pas à revenir vers moi si nécessaire.",
                "De rien ! Je suis là pour vous aider."
            ],
            "unknown": [
                "Je ne suis pas sûr de comprendre. Pourriez-vous reformuler votre question ?",
                "Je n'ai pas bien saisi votre demande. Pourriez-vous la préciser ?",
                "Je ne suis pas certain de comprendre. Pourriez-vous être plus précis ?"
            ]
        }

    def detect_intent(self, message: str) -> str:
        message = message.lower()
        
        # Check for FAQ matches
        for faq_id, faq in self.faqs.items():
            if any(keyword in message for keyword in faq["keywords"]):
                return f"faq_{faq_id}"
        
        # Check for other intents
        if any(word in message for word in ["bonjour", "salut", "hello", "coucou"]):
            return "greeting"
        elif any(word in message for word in ["au revoir", "bye", "à bientôt"]):
            return "farewell"
        elif any(word in message for word in ["merci", "thanks"]):
            return "thanks"
        
        return "unknown"

    def generate_response(self, message: str, chat_history: List[Dict[str, str]] = None) -> str:
        try:
            intent = self.detect_intent(message)
            
            # Handle FAQ responses
            if intent.startswith("faq_"):
                faq_id = intent.split("_")[1]
                return self.faqs[faq_id]["answer"]
            
            # Handle other intents
            return random.choice(self.responses[intent])

        except Exception as e:
            error_message = str(e)
            logger.error(f"Erreur lors de la génération de la réponse: {error_message}")
            return "Je suis désolé, mais je rencontre des difficultés techniques. Notre équipe technique a été notifiée et travaille à résoudre ce problème. Veuillez réessayer dans quelques minutes."

chat_ai = ChatAI() 