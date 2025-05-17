from celery import shared_task
from django.core.files.base import ContentFile
import logging
import time
import json

logger = logging.getLogger(__name__)

@shared_task
def generate_analysis_report(analysis_id):
    """
    Generate a PDF report for the digital posture analysis
    
    This is a placeholder task. In a real implementation:
    1. Fetch the analysis data from the database
    2. Generate a PDF report with the analysis results and recommendations
    3. Save the PDF to the analysis report_file field
    """
    try:
        # Simulate processing time
        time.sleep(5)  # 5 seconds delay to simulate PDF generation
        
        # Import models here to avoid circular imports
        from .models import DigitalPostureAnalysis
        
        # Get the analysis
        analysis = DigitalPostureAnalysis.objects.get(id=analysis_id)
        
        # In a real implementation, you would generate a PDF here
        # For this example, we'll just create a simple text file
        report_content = (
            f"Digital Posture Analysis Report\n"
            f"===============================\n\n"
            f"Client: {analysis.client.company_name}\n"
            f"Analysis Date: {analysis.analysis_date.strftime('%Y-%m-%d')}\n"
            f"Overall Score: {analysis.score}\n\n"
            f"Metrics:\n{json.dumps(analysis.metrics, indent=2)}\n\n"
            f"Recommendations:\n"
        )
        
        for rec in analysis.recommendations.all():
            report_content += (
                f"- {rec.title} (Priority: {rec.priority})\n"
                f"  {rec.description}\n\n"
            )
        
        # Save the report to the analysis object
        filename = f"digital_posture_report_{analysis.client.company_name.replace(' ', '_')}_{analysis.analysis_date.strftime('%Y%m%d')}.txt"
        analysis.report_file.save(filename, ContentFile(report_content.encode('utf-8')))
        
        logger.info(f"Report generated for analysis {analysis_id}")
        return f"Report generated for analysis {analysis_id}"
    
    except Exception as e:
        logger.error(f"Error generating report for analysis {analysis_id}: {str(e)}")
        return f"Error generating report: {str(e)}"


@shared_task
def update_digital_maturity_scores():
    """
    Periodic task to update digital maturity scores for all clients
    
    This would typically run on a schedule to keep scores up-to-date
    based on latest data from websites, social media, etc.
    """
    try:
        # Import models here to avoid circular imports
        from users.models import ClientProfile
        
        # Get all client profiles
        clients = ClientProfile.objects.all()
        updated_count = 0
        
        for client in clients:
            # In a real implementation, you would fetch new data and recalculate scores
            # This is just a placeholder that slightly adjusts existing scores
            
            # Skip clients with no score
            if client.digital_maturity_score == 0:
                continue
                
            # Add a small random adjustment to simulate change
            import random
            adjustment = random.uniform(-2.0, 2.0)
            new_score = max(min(client.digital_maturity_score + adjustment, 100), 0)
            
            client.digital_maturity_score = new_score
            client.save()
            updated_count += 1
        
        logger.info(f"Updated digital maturity scores for {updated_count} clients")
        return f"Updated digital maturity scores for {updated_count} clients"
    
    except Exception as e:
        logger.error(f"Error updating digital maturity scores: {str(e)}")
        return f"Error updating digital maturity scores: {str(e)}"