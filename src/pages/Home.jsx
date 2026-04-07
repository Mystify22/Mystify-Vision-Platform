import React from 'react';
import Hero from '../components/sections/Hero';
import CreateWidget from '../components/sections/CreateWidget';
import ReelSimulator from '../components/sections/ReelSimulator';
import GamificationHub from '../components/sections/GamificationHub';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';

const Home = () => {
    return (
        <div className="flex flex-col">
            <Hero />
            <section id="create" className="relative scroll-mt-24 pt-10">
                <CreateWidget />
            </section>
            <ReelSimulator />
            <GamificationHub />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;
