import React from 'react';
import CreateWidget from '../components/sections/CreateWidget/CreateWidget';
import PhoneSimulator from '../components/sections/PhoneSimulator/PhoneSimulator';
import GamificationHub from '../components/sections/GamificationHub/GamificationHub';
import Testimonials from '../components/sections/Testimonials/Testimonials';
import FAQ from '../components/sections/FAQ/FAQ';

const Home = () => {
    return (
        <div className="flex flex-col">
            <section id="create" className="relative scroll-mt-24 pt-10">
                <CreateWidget />
            </section>
            <PhoneSimulator />
            <GamificationHub />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;
