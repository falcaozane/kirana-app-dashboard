// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Store } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center">
                <Store className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Dukandaar</span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Empowering local stores with modern inventory management solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                {['About', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Contact Us
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="text-sm text-gray-500">
                  Email: support@dukandaar.com
                </li>
                <li className="text-sm text-gray-500">
                  Phone: +91 123-456-7890
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              © {currentYear} Dukandaar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;