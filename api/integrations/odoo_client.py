import requests
import logging
from xmlrpc import client as xmlrpc_client
from django.conf import settings

logger = logging.getLogger(__name__)

class OdooClient:
    """
    Client for Odoo API integration
    
    This is a simplified version - in a real implementation, you would have
    more comprehensive error handling and retry logic
    """
    
    def __init__(self):
        self.url = settings.ODOO_URL
        self.db = settings.ODOO_DB
        self.username = settings.ODOO_USERNAME
        self.password = settings.ODOO_PASSWORD
        self.uid = None
        self.common = None
        self.models = None
        
        # Initialize connection
        self._init_connection()
    
    def _init_connection(self):
        """Initialize the Odoo connection"""
        try:
            # Prepare connection
            common_endpoint = f"{self.url}/xmlrpc/2/common"
            self.common = xmlrpc_client.ServerProxy(common_endpoint)
            
            # Authenticate
            self.uid = self.common.authenticate(self.db, self.username, self.password, {})
            
            if not self.uid:
                logger.error("Failed to authenticate with Odoo")
                return False
            
            # Set up models endpoint
            models_endpoint = f"{self.url}/xmlrpc/2/object"
            self.models = xmlrpc_client.ServerProxy(models_endpoint)
            
            logger.info("Successfully connected to Odoo")
            return True
            
        except Exception as e:
            logger.error(f"Error connecting to Odoo: {str(e)}")
            return False
    
    def _execute_kw(self, model, method, args=None, kwargs=None):
        """Execute a method on a model with given arguments"""
        if args is None:
            args = []
        if kwargs is None:
            kwargs = {}
        
        if not self.uid or not self.models:
            success = self._init_connection()
            if not success:
                logger.error("Failed to initialize Odoo connection")
                return None
        
        try:
            result = self.models.execute_kw(
                self.db, self.uid, self.password,
                model, method, args, kwargs
            )
            return result
        except Exception as e:
            logger.error(f"Odoo API error ({model}.{method}): {str(e)}")
            return None
    
    def get_partner(self, partner_id):
        """Get a partner by ID"""
        return self._execute_kw('res.partner', 'read', [[partner_id]], {'fields': ['name', 'email', 'phone']})
    
    def search_partners(self, domain=None, limit=100):
        """Search for partners"""
        if domain is None:
            domain = []
        
        partner_ids = self._execute_kw('res.partner', 'search', [domain], {'limit': limit})
        if not partner_ids:
            return []
        
        return self._execute_kw('res.partner', 'read', [partner_ids])
    
    def create_partner(self, data):
        """Create a new partner"""
        return self._execute_kw('res.partner', 'create', [data])
    
    def update_partner(self, partner_id, data):
        """Update an existing partner"""
        return self._execute_kw('res.partner', 'write', [[partner_id], data])
    
    def get_invoices(self, partner_id=None, limit=100):
        """Get invoices, optionally filtered by partner"""
        domain = []
        if partner_id:
            domain = [('partner_id', '=', partner_id)]
        
        invoice_ids = self._execute_kw('account.move', 'search', [domain], {'limit': limit})
        if not invoice_ids:
            return []
        
        return self._execute_kw('account.move', 'read', [invoice_ids])
    
    def get_products(self, limit=100):
        """Get products/services"""
        product_ids = self._execute_kw('product.template', 'search', [[('type', '=', 'service')]], {'limit': limit})
        if not product_ids:
            return []
        
        return self._execute_kw('product.template', 'read', [product_ids])
    
    def create_project(self, data):
        """Create a new project"""
        return self._execute_kw('project.project', 'create', [data])
    
    def get_projects(self, partner_id=None, limit=100):
        """Get projects, optionally filtered by partner"""
        domain = []
        if partner_id:
            domain = [('partner_id', '=', partner_id)]
        
        project_ids = self._execute_kw('project.project', 'search', [domain], {'limit': limit})
        if not project_ids:
            return []
        
        return self._execute_kw('project.project', 'read', [project_ids])