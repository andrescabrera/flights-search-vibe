import React from 'react';
import SearchForm from '../components/SearchForm';
import RecentSearches from '../components/RecentSearches';
import { MapPin, Plane, Clock, Shield, CreditCard } from 'lucide-react';

const popularDestinations = [
  {
    city: 'New York',
    country: 'United States',
    image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    city: 'Sydney',
    country: 'Australia',
    image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Airplane wing" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Find Your Perfect Flight</h1>
            <p className="text-xl opacity-90 mb-8 animate-fade-in">
              Compare prices, schedules, and find the best deals on flights worldwide
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto animate-slide-up">
            <SearchForm />
          </div>
        </div>
      </section>
      
      {/* Recent Searches Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <RecentSearches />
        </div>
      </section>
      
      {/* Popular Destinations */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Popular Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.city} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{destination.city}</h3>
                    <p className="text-sm">{destination.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Why Choose SkySearch?
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We're committed to finding you the best flights at the best prices, with no hidden fees.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Plane className="text-primary-600" />} 
              title="Extensive Flight Options" 
              description="Compare flights from hundreds of airlines and travel sites to find the best deals."
            />
            <FeatureCard 
              icon={<Clock className="text-primary-600" />} 
              title="Real-Time Updates" 
              description="Get the latest pricing and availability information in real-time."
            />
            <FeatureCard 
              icon={<Shield className="text-primary-600" />} 
              title="Secure Booking" 
              description="Book with confidence knowing your personal and payment information is secure."
            />
            <FeatureCard 
              icon={<CreditCard className="text-primary-600" />} 
              title="No Hidden Fees" 
              description="Transparent pricing with no surprise charges or hidden booking fees."
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get the Latest Flight Deals
            </h2>
            <p className="mb-6 opacity-90">
              Subscribe to our newsletter and never miss out on exclusive flight offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="btn btn-accent whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;