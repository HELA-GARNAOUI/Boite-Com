import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  services: [
    { name: "Web Development", href: "/services/web-development" },
    { name: "SEO Services", href: "/services/seo" },
    { name: "Social Media", href: "/services/social-media" },
    { name: "Content Creation", href: "/services/content" },
    { name: "UI/UX Design", href: "/services/design" },
  ],
  social: [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-custom py-12 md:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                DF
              </div>
              <span className="text-2xl font-bold">DigiFlow</span>
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Creating digital experiences that transform businesses and delight users.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Contact Us</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li className="flex gap-x-3">
                  <Mail className="h-6 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="text-sm leading-6 text-gray-300">contact@digiflow.com</span>
                </li>
                <li className="flex gap-x-3">
                  <Phone className="h-6 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="text-sm leading-6 text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex gap-x-3">
                  <MapPin className="h-6 w-5 flex-none text-gray-400" aria-hidden="true" />
                  <span className="text-sm leading-6 text-gray-300">123 Digital Street, Tech City, 10001</span>
                </li>
              </ul>

              <div className="mt-10">
                <h3 className="text-sm font-semibold leading-6 text-white">Subscribe to our newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  The latest news, articles, and resources, sent to your inbox weekly.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} DigiFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
