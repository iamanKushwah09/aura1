import React from 'react';
import { MessageSquare, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const Hero = () => {
  const { config, getWhatsAppLink } = useConfig();

  return (
    <section
      className="section-padding"
      style={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        paddingTop: '60px',
        paddingBottom: '90px',
      }}
    >
      {/* Soft Green and Blue Mesh Orbs */}
      <div className="hero-bg-mesh">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="max-w-content" style={{ maxWidth: '920px', position: 'relative', zIndex: 1 }}>
        {/* Colorful Badge */}
        <div style={{ marginBottom: '24px' }}>
          <span className="badge-pill">
            <Sparkles size={15} color="#059669" />
            <span>{config.heroBadge || '⚡ Next-Gen Web Solutions & Growth Platform'}</span>
          </span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.4rem, 6.5vw, 4.4rem)',
            fontWeight: '900',
            lineHeight: '1.12',
            letterSpacing: '-0.035em',
            color: '#0f172a',
            marginBottom: '22px',
          }}
        >
          Scale Your Business With{' '}
          <span className="gradient-text">High-Converting Digital</span>{' '}
          Experiences
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
            lineHeight: '1.7',
            marginBottom: '42px',
            maxWidth: '680px',
            margin: '0 auto 42px auto',
            fontWeight: '500',
          }}
        >
          {config.heroSubtitle ||
            'We engineer ultra-responsive web applications, seamless UI/UX architectures, and direct instant customer messaging channels.'}
        </p>

        {/* Action Button */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '54px',
          }}
        >
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ fontSize: '1.02rem', padding: '16px 36px', maxWidth: '340px', width: '100%' }}
          >
            <MessageSquare size={22} />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>

        {/* Trust Badges Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              background: '#ffffff',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '9999px',
              boxShadow: '0 4px 15px -3px rgba(16, 185, 129, 0.12)',
            }}
          >
            <Zap size={17} color="#059669" />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
              Ultra Fast Speed
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              background: '#ffffff',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              borderRadius: '9999px',
              boxShadow: '0 4px 15px -3px rgba(37, 99, 235, 0.12)',
            }}
          >
            <ShieldCheck size={17} color="#2563eb" />
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
              Enterprise Grade
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              boxShadow: '0 4px 15px -3px rgba(15, 23, 42, 0.05)',
            }}
          >
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
              24/7 Live Availability
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
