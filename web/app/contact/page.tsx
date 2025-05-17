import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import ContactForm from "@/components/contact/ContactForm"
import LocationMap from "@/components/contact/LocationMap"

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-gray-900 dark:text-white">Contact Us</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Have a question or want to discuss a project? We'd love to hear from you. Fill out the form below or use
              our contact information to get in touch.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Email Us
              </CardTitle>
              <CardDescription>Send us an email anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:contact@digiflow.com"
                className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                contact@digiflow.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Call Us
              </CardTitle>
              <CardDescription>Mon-Fri from 9am to 6pm</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="tel:+15551234567"
                className="text-lg font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                +1 (555) 123-4567
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                Visit Us
              </CardTitle>
              <CardDescription>Come say hello at our office</CardDescription>
            </CardHeader>
            <CardContent>
              <address className="text-lg font-medium text-gray-900 dark:text-white not-italic">
                123 Digital Street
                <br />
                Tech City, 10001
              </address>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-3 text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="heading-3 text-gray-900 dark:text-white mb-6">Our Location</h2>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <LocationMap />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What is your typical process for new clients?",
                answer:
                  "Our process typically begins with an initial consultation to understand your needs, followed by a proposal, project planning, execution, and ongoing support.",
              },
              {
                question: "How long does it take to complete a project?",
                answer:
                  "Project timelines vary depending on complexity. A simple website might take 4-6 weeks, while more complex projects can take 3-6 months. We'll provide a detailed timeline during the discovery phase.",
              },
              {
                question: "Do you offer ongoing support after project completion?",
                answer:
                  "Yes, we offer various support and maintenance packages to ensure your digital assets continue to perform optimally after launch.",
              },
              {
                question: "What information do you need to provide a quote?",
                answer:
                  "To provide an accurate quote, we typically need to understand your project goals, target audience, desired features, timeline, and budget range.",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full h-16 w-16 shadow-lg">
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Live Chat</span>
        </Button>
      </div>
    </div>
  )
}
