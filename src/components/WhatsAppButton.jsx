import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck, CheckCheck } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const WhatsAppButton = () => {
  const { config, getWhatsAppLink } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const link = getWhatsAppLink(customMsg.trim() || config.whatsappMessage);
    window.open(link, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="whatsapp-float-wrapper">
      {/* Quick Popup Card */}
      {isOpen && (
        <div className="whatsapp-popup-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #25D366, #10B981)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  {config.agentName ? config.agentName.charAt(0).toUpperCase() : 'A'}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#10B981',
                    border: '2px solid #ffffff',
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {config.agentName || 'Support Agent'}
                  <ShieldCheck size={14} color="#10b981" />
                </div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="pulse-dot"></span> Online • Fast Replies
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>

          <div
            style={{
              background: 'rgba(37, 211, 102, 0.08)',
              borderRadius: '14px',
              padding: '14px',
              marginBottom: '14px',
              border: '1px solid rgba(37, 211, 102, 0.25)',
            }}
          >
            <p style={{ fontSize: '12px', color: '#1e293b', lineHeight: '1.45', fontWeight: '600' }}>
              👋 <strong>Hi there!</strong>
              <br />
              How can we help you scale your business today? Send us a WhatsApp message!
            </p>
            <div style={{ fontSize: '10px', color: '#059669', textAlign: 'right', marginTop: '6px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
              Just now <CheckCheck size={12} color="#10b981" />
            </div>
          </div>

          <form onSubmit={handleSend}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder={config.whatsappMessage || 'Type your message...'}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 14px',
                  borderRadius: '24px',
                  background: '#f8fafc',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  color: '#0f172a',
                  fontSize: '12px',
                  fontWeight: '600',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'linear-gradient(135deg, #25D366, #10B981)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        className="whatsapp-float-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat"
      >
        <div className="whatsapp-float-badge">1</div>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};
