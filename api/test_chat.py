import logging
from chat.ai import chat_ai

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_chat():
    """Teste le chatbot avec quelques questions simples."""
    test_messages = [
        "Bonjour, qui es-tu ?",
        "Quels sont vos services ?",
        "Combien coûte un site web ?",
        "Pouvez-vous m'aider avec le SEO ?"
    ]
    
    chat_history = []
    
    for message in test_messages:
        logger.info(f"\nUtilisateur: {message}")
        response = chat_ai.generate_response(message, chat_history)
        logger.info(f"Assistant: {response}")
        
        # Ajouter à l'historique
        chat_history.append({"is_from_user": True, "message": message})
        chat_history.append({"is_from_user": False, "message": response})

if __name__ == "__main__":
    logger.info("Démarrage du test du chatbot...")
    test_chat() 