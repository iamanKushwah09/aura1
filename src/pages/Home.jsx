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
      <footer className="footer">
        <div className="max-w-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.2rem',
                fontWeight: '900',
                color: '#0f172a',
              }}
            >
              Nex<span style={{ color: '#059669' }}>ora</span>
              <span style={{ color: '#2563eb' }}>.</span>
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: '500' }}>
            © {new Date().getFullYear()} Nexora Digital. High-Performance Digital Solutions.
          </p>
        </div>
      </footer>
        <WhatsAppButton />
    </div>
  );
};
