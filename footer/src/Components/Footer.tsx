import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">
        {/* Brand + Description */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Foodify</h1>
          <p className="text-sm text-gray-400 mb-4">
            We deliver high-quality solutions to help you grow your business and reach your goals.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-white text-xl">🌐</a>
            <a href="#" aria-label="Twitter" className="hover:text-white text-xl">🐦</a>
            <a href="#" aria-label="Instagram" className="hover:text-white text-xl">📸</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="/services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-sm text-gray-400 mb-2">Smartworks</p>
          <p className="text-sm text-gray-400 mb-2">Noida, Uttar Pradesh, India</p>
          <p className="text-sm text-gray-400 mb-2">Email: ayush@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +7307585258</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Foodify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
