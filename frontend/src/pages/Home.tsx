import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center animate-fade-in-up">
      <div className="mb-20">
        <div className="animate-float mb-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">IA03</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Modern, secure, and user-friendly registration system with beautiful interface
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 m-20 pb-8">
        <div className="feature-card text-center animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Absolute Security</h3>
          <p className="text-gray-600 leading-relaxed">
            Advanced encryption, secure password hashing, and industry-standard security protocols 
            protect your data at every step.
          </p>
        </div>
        
        <div className="feature-card text-center animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning Fast</h3>
          <p className="text-gray-600 leading-relaxed">
            Instant registration with real-time validation, smart error handling, 
            and optimized performance for the best user experience.
          </p>
        </div>
        
        <div className="feature-card text-center animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Beautiful Design</h3>
          <p className="text-gray-600 leading-relaxed">
            Modern glassmorphism design with smooth animations, responsive layout 
            and intuitive user interface that works on all devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;