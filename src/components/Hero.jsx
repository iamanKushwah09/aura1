import React from 'react';
import { MessageSquare, ArrowRight, Sparkles, HeartHandshake, Zap } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Hero = () => {
  const { config, getWhatsAppLink } = useConfig();

  return (
    <section className="section-padding" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div className="max-w-content" style={{ maxWidth: '880px' }}>
        {/* Colorful Badge */}
        <div style={{ marginBottom: '24px' }}>
          <span className="badge-pill">
            <Sparkles size={16} color="#ec4899" />
            <span>{config.heroBadge || '🔥 Mobile-First Vibrant Digital Studio'}</span>
          </span>
        </div>

        {/* Title */}
        <h1
          className="gradient-text"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
            fontWeight: '800',
            lineHeight: '1.12',
            letterSpacing: '-0.03em',
            marginBottom: '22px',
          }}
        >
          {config.heroTitle || 'Transforming Ideas into Colorful Digital Masterpieces'}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
            lineHeight: '1.65',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px auto',
            fontWeight: '500',
          }}
        >
          {config.heroSubtitle ||
            'Supercharge your business with ultra-responsive, high-performance web applications designed for maximum mobile conversion.'}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '54px',
          }}
        >
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ width: '100%', maxWidth: '340px', justifyContent: 'center', fontSize: '1.05rem' }}
          >
            <MessageSquare size={22} />
            <span>Chat on WhatsApp Now</span>
          </a>

          {/* <a
            href="#services"
            className="btn-secondary"
            style={{ width: '100%', maxWidth: '340px', justifyContent: 'center' }}
          > */}
            {/* <span>Explore Services</span> */}
            {/* <ArrowRight size={18} /> */}
          {/* </a> */}
        </div>

        {/* Availability Badge */}
        <div
          className="glass-card"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px 36px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 232, 255, 0.6) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '9999px',
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.1)',
          }}
        >
          <span
            style={{
              position: 'relative',
              display: 'flex',
              height: '12px',
              width: '12px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                opacity: 0.75,
              }}
            />
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: '12px',
                width: '12px',
                backgroundColor: '#10b981',
              }}
            />
          </span>
          <span
            style={{
              fontSize: '1.35rem',
              fontWeight: '800',
              color: '#1e1b4b',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.02em',
            }}
          >
            24/7 Available
          </span>
        </div>
      </div>
    </section>
  );
};
