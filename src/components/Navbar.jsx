import React, { useState } from 'react';
import { Sparkles, MessageCircle, Menu, X } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Navbar = () => {
  const { getWhatsAppLink } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.12)',
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.05)',
      }}
    >
      <div
        className="max-w-content"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 6px 20px rgba(236, 72, 153, 0.35)',
            }}
          >
            <Sparkles size={22} color="#fff" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                color: '#0f172a',
              }}
            >
              AURA<span style={{ color: '#ec4899' }}>.</span>
            </span>
            <div style={{ fontSize: '11px', color: '#6366f1', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="pulse-dot"></span> Mobile-First Experience
            </div>
          </div>
        </a>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ padding: '9px 20px', fontSize: '0.88rem' }}
          >
            <MessageCircle size={17} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
