import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Bubbles from './components/layout/Bubbles';
import Hero from './components/sections/Hero';
import CreateWidget from './components/sections/CreateWidget';
import ReelSimulator from './components/sections/ReelSimulator';
import GamificationHub from './components/sections/GamificationHub';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Features from './components/sections/Features';

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
        <Hero />
        
        <section id="create" className="relative scroll-mt-24 pt-20">
          <CreateWidget />
        </section>
        
        <ReelSimulator />
        
        <Features />
        
        <GamificationHub />
        <Testimonials />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
