import openai
import logging
from django.conf import settings

logger = logging.getLogger(__name__)

class OpenAIClient:
    """
    Client for OpenAI API integration
    """
    
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
    
    def analyze_text(self, text, max_tokens=100):
        """Analyze text and return a summary"""
        try:
            response = openai.Completion.create(
                model="gpt-3.5-turbo-instruct",
                prompt=f"Analyze the following text and provide a brief summary:\n\n{text}\n\nSummary:",
                max_tokens=max_tokens,
                temperature=0.7
            )
            return response.choices[0].text.strip()
        except Exception as e:
            logger.error(f"OpenAI API error (analyze_text): {str(e)}")
            return None
    
    def generate_recommendations(self, analysis_data, num_recommendations=3):
        """Generate recommendations based on digital posture analysis data"""
        try:
            prompt = f"""
            Based on the following digital posture analysis data, provide {num_recommendations} specific recommendations for improvement:
            
            Overall Score: {analysis_data.get('score', 'N/A')}
            
            Metrics:
            {self._format_metrics(analysis_data.get('metrics', {}))}
            
            For each recommendation, include:
            1. A clear, concise title
            2. A detailed description
            3. The category (SEO, Social Media, Website, Branding, Marketing, or Technology)
            4. Priority level (High, Medium, or Low)
            5. Estimated effort required
            6. Estimated impact
            
            Format each recommendation as:
            
            TITLE: [title]
            DESCRIPTION: [description]
            CATEGORY: [category]
            PRIORITY: [priority]
            EFFORT: [effort]
            IMPACT: [impact]
            
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a digital marketing expert specializing in providing actionable recommendations for improving a company's digital presence."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            return response.choices[0].message['content'].strip()
        except Exception as e:
            logger.error(f"OpenAI API error (generate_recommendations): {str(e)}")
            return None
    
    def generate_action_plan(self, recommendations, company_name):
        """Generate an action plan based on recommendations"""
        try:
            # Format recommendations for the prompt
            formatted_recommendations = "\n\n".join([
                f"Recommendation: {rec.title}\n"
                f"Description: {rec.description}\n"
                f"Category: {rec.category}\n"
                f"Priority: {rec.priority}"
                for rec in recommendations
            ])
            
            prompt = f"""
            Create a comprehensive action plan for {company_name} based on the following recommendations:
            
            {formatted_recommendations}
            
            The action plan should include:
            1. An executive summary
            2. Strategic goals
            3. Detailed implementation steps for each recommendation
            4. Timeline for implementation
            5. Expected outcomes and KPIs
            
            Format as clear sections with headlines.
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a digital strategy consultant who creates detailed action plans for businesses."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            return response.choices[0].message['content'].strip()
        except Exception as e:
            logger.error(f"OpenAI API error (generate_action_plan): {str(e)}")
            return None
    
    def generate_blog_content(self, topic, target_audience, word_count=500):
        """Generate blog content on a given topic"""
        try:
            prompt = f"""
            Write a blog post about {topic}.
            
            Target audience: {target_audience}
            Word count: approximately {word_count} words
            
            The blog should be:
            - Informative and valuable to the reader
            - Well-structured with clear headings
            - Written in a professional but engaging tone
            - Include actionable insights or takeaways
            
            Include a catchy title and structure the blog with an introduction, main sections, and conclusion.
            """
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an expert content writer who specializes in creating engaging blog posts for businesses."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            return response.choices[0].message['content'].strip()
        except Exception as e:
            logger.error(f"OpenAI API error (generate_blog_content): {str(e)}")
            return None
    
    def _format_metrics(self, metrics):
        """Format metrics dictionary for prompt input"""
        result = []
        for key, value in metrics.items():
            if isinstance(value, dict):
                result.append(f"{key}:")
                for sub_key, sub_value in value.items():
                    result.append(f"  - {sub_key}: {sub_value}")
            else:
                result.append(f"- {key}: {value}")
        
        return "\n".join(result)