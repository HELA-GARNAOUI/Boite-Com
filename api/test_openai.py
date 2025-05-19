from openai import OpenAI
import os
from dotenv import load_dotenv
import logging
import requests
import time

# Configuration du logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Charger les variables d'environnement
env_path = os.path.join(os.path.dirname(__file__), 'config.env')
logger.debug(f"Tentative de chargement du fichier config.env depuis: {env_path}")
load_dotenv(env_path)

# Vérifier la clé API
api_key = os.getenv('OPENAI_API_KEY')
if api_key:
    logger.debug("Clé API trouvée dans les variables d'environnement")
    # Masquer la clé pour la sécurité
    masked_key = api_key[:8] + '*' * (len(api_key) - 12) + api_key[-4:]
    logger.debug(f"Clé API (masquée): {masked_key}")
else:
    logger.error("Aucune clé API trouvée dans les variables d'environnement")

def test_connection():
    try:
        # Test de connexion à l'API OpenAI
        response = requests.get(
            "https://api.openai.com/v1/models",
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=10
        )
        logger.info(f"Statut de la connexion: {response.status_code}")
        if response.status_code == 200:
            logger.info("Connexion à l'API OpenAI réussie")
            return True
        else:
            logger.error(f"Erreur de connexion: {response.text}")
            return False
    except Exception as e:
        logger.error(f"Erreur lors du test de connexion: {str(e)}")
        return False

def test_openai():
    try:
        # Test de connexion d'abord
        if not test_connection():
            return False

        # Initialiser le client OpenAI
        client = OpenAI(api_key=api_key)

        # Test simple avec un message court
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Tu es un assistant utile."},
                {"role": "user", "content": "Bonjour, comment vas-tu ?"}
            ],
            max_tokens=50
        )
        
        logger.info("Test réussi !")
        logger.info(f"Réponse: {response.choices[0].message.content}")
        return True
        
    except Exception as e:
        logger.error(f"Erreur lors du test: {str(e)}")
        return False

if __name__ == "__main__":
    test_openai() 