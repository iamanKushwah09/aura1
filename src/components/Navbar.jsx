import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Navbar = () => {
  const { getWhatsAppLink } = useConfig();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '12px 20px',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="max-w-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderRadius: '20px',
          background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(16, 185, 129, 0.18)',
          boxShadow: scrolled ? '0 10px 30px -5px rgba(15, 23, 42, 0.08)' : '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '13px',
              background: 'linear-gradient(135deg, #10b981 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 6px 18px rgba(16, 185, 129, 0.3)',
            }}
          >
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: '900',
                color: '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Nex<span style={{ color: '#059669' }}>ora</span>
              <span style={{ color: '#2563eb' }}>.</span>
            </span>
            <div style={{ fontSize: '11px', color: '#0284c7', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="pulse-dot"></span> Digital Studio
            </div>
          </div>
        </a>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: '9px 20px', fontSize: '0.88rem', borderRadius: '12px' }}
          >
            <MessageCircle size={17} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
