import React from 'react';
import Hero from '../features/hero/Hero';
import CreateWidget from '../features/create-widget/CreateWidget';
import ReelSimulator from '../features/reel-simulator/ReelSimulator';
import GamificationHub from '../features/gamification/GamificationHub';
import Testimonials from '../features/testimonials/Testimonials';
import FAQ from '../features/faq/FAQ';
import './Home.css';

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
