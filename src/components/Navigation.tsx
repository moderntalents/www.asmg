import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', live: false },
    { name: 'About', href: '#about', live: false },
    { name: 'Sports', href: '#sports', live: false },
    { name: 'Register', href: '#register', live: false },
    { name: 'Gallery', href: '#gallery', live: false },
    { name: 'Live', href: '#live', live: true },
    { name: 'Contact', href: '#contact', live: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="/WhatsApp_Image_2026-04-15_at_03.01.41.jpeg"
              alt="African Sports Mini Games Logo"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
                  link.live
                    ? 'text-red-600 hover:text-red-700 font-bold'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {link.live && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                )}
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 inline-block"
            >
              Register Now
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 py-2 font-medium ${
                  link.live
                    ? 'text-red-600 hover:text-red-700 font-bold'
                    : 'text-gray-700 hover:text-green-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.live && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                )}
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold block text-center"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
