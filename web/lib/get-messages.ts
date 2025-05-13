export async function getMessages(locale: string) {
  try {
    // In a real app, you would load messages from a file or API
    // For now, we'll return a simple object with some translations
    return (
      {
        en: {
          common: {
            welcome: "Welcome to our Agency",
            login: "Login",
            logout: "Logout",
            dashboard: "Dashboard",
            profile: "Profile",
            settings: "Settings",
          },
          home: {
            title: "Digital Solutions for Your Business",
            subtitle:
              "We help businesses grow with innovative digital strategies, web development, and marketing solutions.",
            getStarted: "Get Started",
            ourServices: "Our Services",
          },
          services: {
            title: "Our Services",
            subtitle: "We offer a comprehensive range of digital services to help your business grow.",
            webDevelopment: "Web Development",
            seo: "SEO Services",
            socialMedia: "Social Media",
            erpIntegration: "ERP Integration",
            branding: "Branding",
          },
          dashboard: {
            overview: "Overview",
            projects: "Projects",
            analytics: "Analytics",
            invoices: "Invoices",
            crm: "CRM",
            hrPortal: "HR Portal",
            salesPortal: "Sales Portal",
          },
        },
        es: {
          common: {
            welcome: "Bienvenido a nuestra Agencia",
            login: "Iniciar sesión",
            logout: "Cerrar sesión",
            dashboard: "Panel de control",
            profile: "Perfil",
            settings: "Configuración",
          },
          home: {
            title: "Soluciones digitales para tu negocio",
            subtitle:
              "Ayudamos a las empresas a crecer con estrategias digitales innovadoras, desarrollo web y soluciones de marketing.",
            getStarted: "Comenzar",
            ourServices: "Nuestros Servicios",
          },
          services: {
            title: "Nuestros Servicios",
            subtitle: "Ofrecemos una amplia gama de servicios digitales para ayudar a tu negocio a crecer.",
            webDevelopment: "Desarrollo Web",
            seo: "Servicios SEO",
            socialMedia: "Redes Sociales",
            erpIntegration: "Integración ERP",
            branding: "Branding",
          },
          dashboard: {
            overview: "Resumen",
            projects: "Proyectos",
            analytics: "Analíticas",
            invoices: "Facturas",
            crm: "CRM",
            hrPortal: "Portal RRHH",
            salesPortal: "Portal de Ventas",
          },
        },
      }[locale] || {
        common: {},
        home: {},
        services: {},
        dashboard: {},
      }
    )
  } catch (error) {
    console.error("Failed to load messages:", error)
    return {}
  }
}
