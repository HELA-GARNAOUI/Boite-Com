from typing import List, Dict
import logging
import random
from rapidfuzz import process, fuzz

logger = logging.getLogger(__name__)

class ChatAI:
    def __init__(self):
        self.intents = {
            "greeting": [
                "bonjour", "salut", "hello", "hi"
            ],
            "services": [
                "service", "offre", "proposez", "proposition", "prestations", "aidez-moi", "aide"
            ],
            "pricing": [
                "prix", "tarif", "coûte", "combien", "facture", "montant"
            ],
            "seo": [
                "seo", "référencement", "visibilité", "google", "optimisation"
            ]
        }
        self.responses = {
            "greeting": [
                "Bonjour ! Je suis DigiFlow, votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
                "Bonjour ! Je suis ravi de vous aider. Que puis-je faire pour vous ?",
                "Bonjour ! Je suis DigiFlow, à votre service. Comment puis-je vous assister ?"
            ],
            "services": [
                "Nous proposons plusieurs services : Développement Web (à partir de 2000€), SEO (à partir de 500€/mois), Social Media (à partir de 800€/mois) et Marketing Digital (sur devis).",
                "Nos services incluent le développement web, le SEO, la gestion des réseaux sociaux et le marketing digital. Souhaitez-vous plus de détails sur l'un de ces services ?",
                "Nous sommes spécialisés dans le développement web, le référencement, la gestion des réseaux sociaux et le marketing digital. Quel service vous intéresse ?"
            ],
            "pricing": [
                "Nos tarifs varient selon vos besoins : Sites web à partir de 2000€, SEO à partir de 500€/mois, Social Media à partir de 800€/mois, et Marketing Digital sur devis.",
                "Pour un site web, comptez à partir de 2000€. Le SEO démarre à 500€/mois, et la gestion des réseaux sociaux à 800€/mois. Le marketing digital est sur devis.",
                "Nos prix sont compétitifs : développement web à partir de 2000€, SEO à partir de 500€/mois, réseaux sociaux à partir de 800€/mois."
            ],
            "seo": [
                "Le SEO est essentiel pour améliorer votre visibilité en ligne. Nous proposons des solutions à partir de 500€/mois.",
                "Notre service SEO comprend l'optimisation technique, la recherche de mots-clés, et la création de contenu. Tarifs à partir de 500€/mois.",
                "Le référencement naturel est crucial pour votre présence en ligne. Nos experts peuvent vous aider à partir de 500€/mois."
            ],
            "default": [
                "Je suis désolé, je n'ai pas bien compris votre question. Pourriez-vous la reformuler ?",
                "Je ne suis pas sûr de comprendre. Pourriez-vous préciser votre demande ?",
                "Je ne suis pas certain de bien saisir votre question. Pourriez-vous la reformuler différemment ?"
            ]
        }

    def detect_intent(self, message: str) -> str:
        message = message.lower()
        best_intent = None
        best_score = 0
        for intent, keywords in self.intents.items():
            match, score, _ = process.extractOne(message, keywords, scorer=fuzz.partial_ratio)
            if score > best_score and score > 70:
                best_intent = intent
                best_score = score
        return best_intent if best_intent else "default"

    def generate_response(self, message: str, chat_history: List[Dict[str, str]] = None) -> str:
        try:
            intent = self.detect_intent(message)
            return random.choice(self.responses[intent])

        except Exception as e:
            error_message = str(e)
            logger.error(f"Erreur lors de la génération de la réponse: {error_message}")
            return "Je suis désolé, mais je rencontre des difficultés techniques. Notre équipe technique a été notifiée et travaille à résoudre ce problème. Veuillez réessayer dans quelques minutes."

chat_ai = ChatAI() 