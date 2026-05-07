import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Bubbles from './components/common/Bubbles';
import ComingSoon from './features/coming-soon/ComingSoon';
import Features from './features/features-section/Features';
import ReelSimulator from './features/reel-simulator/ReelSimulator';
import Testimonials from './features/testimonials/Testimonials';
import Stats from './features/stats/Stats';
import ContactForm from './features/contact/ContactForm';
import FAQ from './features/faq/FAQ';

function App() {
  return (
    <div className="min-h-screen relative font-sans text-gray-900 bg-[#fbfbfd] selection:bg-indigo-300 selection:text-indigo-900 overflow-hidden flex flex-col">
      <Bubbles />
      
      {/* Dynamic Mesh Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-lavender/40 blur-[120px] mix-blend-multiply pointer-events-none animate-blob" />
      <div className="fixed top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-soft-cyan/40 blur-[120px] mix-blend-multiply pointer-events-none animate-blob animation-delay-2000" />
      <div className="fixed bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-indigo-200/30 blur-[100px] mix-blend-multiply pointer-events-none animate-blob animation-delay-4000" />

      <Navbar />
      
      <main className="relative z-10 flex-1 flex flex-col pt-12 pb-16">
        <ComingSoon />
        <Features />
        <ReelSimulator />
        <Testimonials />
        <Stats />
        <ContactForm />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
