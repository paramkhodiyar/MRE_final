import { Home, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-amber-600" />
              <span className="text-xl font-bold">Maya Real Estate</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect home in Chhattisgarh. 
              We provide premium real estate services with integrity and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-amber-600 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-amber-600 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-amber-600 transition-colors">Contact</a></li>
              <li><a href="/properties" className="text-gray-400 hover:text-amber-600 transition-colors">Properties</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Property Sales</li>
              <li className="text-gray-400">Property Rental</li>
              <li className="text-gray-400">Property Management</li>
              <li className="text-gray-400">Investment Consulting</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Raipur, Chhattisgarh, India</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@mayare.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Maya Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}