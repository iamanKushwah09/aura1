import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const Home = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
      </main>
      <WhatsAppButton />
    </div>
  );
};
