import React, { createContext, useContext } from 'react';

const ConfigContext = createContext();

// Static WhatsApp configuration
export const STATIC_WHATSAPP_NUMBER = '917670812535';
export const STATIC_WHATSAPP_MESSAGE = 'I am interested in your service';

// Helper function to format WhatsApp number
export const formatWhatsAppNumber = (rawNumber = STATIC_WHATSAPP_NUMBER, defaultCountryCode = '91') => {
  if (!rawNumber) return defaultCountryCode + '7670812535';
  let clean = rawNumber.toString().replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }
  if (clean.length === 10) {
    clean = defaultCountryCode + clean;
  }
  return clean;
};

export const ConfigProvider = ({ children }) => {
  const whatsappNumber = STATIC_WHATSAPP_NUMBER;
  const whatsappMessage = STATIC_WHATSAPP_MESSAGE;

  const getWhatsAppLink = (customText) => {
    const textToEncode =
      customText !== undefined && customText !== null && customText.trim() !== ''
        ? customText.trim()
        : STATIC_WHATSAPP_MESSAGE;
    return `https://wa.me/${STATIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(textToEncode)}`;
  };

  return (
    <ConfigContext.Provider
      value={{
        whatsappNumber,
        whatsappMessage,
        getWhatsAppLink,
        config: {
          whatsappNumber,
          whatsappMessage,
          agentName: 'Nexora Support Team',
          heroTitle: 'Scale Your Business With High-Converting Digital Experiences',
          heroSubtitle:
            'We engineer ultra-responsive web applications, seamless UI/UX architectures, and direct instant customer messaging channels.',
          heroBadge: '⚡ Next-Gen Web Solutions & Growth Platform',
        },
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
