import React from 'react';
import Navbar from '../components/Navbar';
import { FiTarget, FiEye, FiAward, FiUsers } from 'react-icons/fi';

export default function About() {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Alex has over 15 years of experience in data analytics and business intelligence.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Sarah Williams',
      role: 'CTO',
      bio: 'Sarah leads our technical team with expertise in AI and machine learning.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Designer',
      bio: 'Michael brings a minimalist yet elegant approach to our product design.',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Data Scientist',
      bio: 'Emma specializes in transforming complex data into actionable insights.',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
    },
  ];

  const values = [
    {
      title: 'Mission',
      description: 'To transform complex data into actionable insights for businesses of all sizes.',
      icon: <FiTarget className="h-8 w-8" />,
    },
    {
      title: 'Vision',
      description: 'Empowering decision-makers with elegant data visualization tools that reveal hidden patterns.',
      icon: <FiEye className="h-8 w-8" />,
    },
    {
      title: 'Excellence',
      description: 'Constantly improving our platform with cutting-edge features and best practices.',
      icon: <FiAward className="h-8 w-8" />,
    },
    {
      title: 'Customer Focus',
      description: 'Putting our customers at the center of everything we design and develop.',
      icon: <FiUsers className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We're a team of data enthusiasts dedicated to creating elegant visualization tools for modern businesses.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Elegant Dashboard began with a simple mission: to transform how businesses visualize and interact with their data.
              </p>
              <p className="text-gray-600 mb-4">
                We noticed that many dashboard solutions were either too complex or too simplistic, failing to strike the right balance between functionality and design. Our team set out to change that with an elegant, black and white interface that emphasizes what matters most: your data.
              </p>
              <p className="text-gray-600">
                Today, our platform serves thousands of businesses across various industries, helping them make better decisions through powerful yet intuitive data visualizations.
              </p>
            </div>
            <div className="relative">
              <div className="bg-accent1/80 absolute -left-4 -top-4 rounded-lg w-full h-full"></div>
              <img 
                src="/about-image.jpg" 
                alt="Our team at work" 
                className="relative z-10 rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from product development to customer support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card hover:shadow-lg transition-all border-t-4 border-accent1 text-center">
                <div className="text-accent1 flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The talented individuals behind our elegant dashboard solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card hover:shadow-lg transition-all overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-64"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-accent1 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to join us?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              Become part of the thousands of businesses that trust our dashboard solution.
            </p>
            <a href="/register" className="btn-primary">
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-primary">Elegant<span className="text-accent1">Dashboard</span></span>
            </div>
            <div className="flex space-x-6">
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ElegantDashboard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 