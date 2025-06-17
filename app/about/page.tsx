'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Award, Users, Home, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Maya Real Estate</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect home in Chhattisgarh. 
            We&apos;ve been serving the community for over a decade with integrity and excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Maya Real Estate was founded with a simple mission: to help people find their dream homes 
                in the beautiful state of Chhattisgarh. What started as a small local business has grown 
                into one of the region&apos;s most trusted real estate agencies.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We understand that buying or selling a home is one of life&apos;s most important decisions. 
                That&apos;s why we&apos;re committed to providing personalized service, expert guidance, and 
                transparent communication throughout your real estate journey.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team of experienced professionals combines local market knowledge with modern 
                technology to deliver exceptional results for our clients.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
                alt="Maya Real Estate Office"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Over the years, we&apos;ve built a strong reputation in the Chhattisgarh real estate market.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Properties Sold</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10+</h3>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Maya Real Estate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Integrity</h3>
                <p className="text-gray-600">
                  We believe in honest, transparent dealings with all our clients. 
                  Your trust is our most valuable asset.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, 
                  from property selection to customer support.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
                <p className="text-gray-600">
                  We&apos;re proud to be part of the Chhattisgarh community and 
                  committed to its growth and development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make Maya Real Estate your trusted partner.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rajesh Sharma</h3>
              <p className="text-amber-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                15+ years of experience in Chhattisgarh real estate market.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Priya Patel</h3>
              <p className="text-amber-600 mb-2">Senior Sales Manager</p>
              <p className="text-gray-600 text-sm">
                Specialist in luxury properties and investment opportunities.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Amit Kumar</h3>
              <p className="text-amber-600 mb-2">Property Consultant</p>
              <p className="text-gray-600 text-sm">
                Expert in residential properties and first-time buyer guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}