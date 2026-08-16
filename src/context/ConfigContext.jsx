import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

const DEFAULT_NUMBER = '919876543210';
const DEFAULT_MESSAGE = 'Hello! I am interested in your digital services.';

// Helper function to automatically format and ensure valid country code for WhatsApp
export const formatWhatsAppNumber = (rawNumber, defaultCountryCode = '91') => {
  if (!rawNumber) return defaultCountryCode + '9876543210';
  let clean = rawNumber.toString().replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }
  // If 10 digits (e.g. 919876543210), automatically add country code
  if (clean.length === 10) {
    clean = defaultCountryCode + clean;
  }
  return clean;
};

// Permanent Unmetered Global Cloud KV Storage
const CLOUD_APP_KEY = '41nguzma';
const CLOUD_GET_URL = `https://keyvalue.immanuel.co/api/KeyVal/GetValue/${CLOUD_APP_KEY}/config`;
const CLOUD_SET_URL = `https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${CLOUD_APP_KEY}/config/`;

// Browser-safe UTF-8 to Hex encoders for cloud KV storage
const strToHex = (str) => {
  try {
    const utf8 = unescape(encodeURIComponent(str));
    let hex = '';
    for (let i = 0; i < utf8.length; i++) {
      hex += utf8.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex;
  } catch (e) {
    return '';
  }
};

const hexToStr = (hex) => {
  try {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return decodeURIComponent(escape(str));
  } catch (e) {
    return '';
  }
};

// Hardcoded Credentials directly in code (No Database)
export const HARDCODED_ADMIN = {
  username: 'admin',
  password: 'admin123',
};

export const ConfigProvider = ({ children }) => {
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    try {
      const stored = localStorage.getItem('nexora_whatsapp_number');
      return stored ? formatWhatsAppNumber(stored) : DEFAULT_NUMBER;
    } catch (e) {
      return DEFAULT_NUMBER;
    }
  });

  const [whatsappMessage, setWhatsappMessage] = useState(() => {
    try {
      return localStorage.getItem('nexora_whatsapp_message') || DEFAULT_MESSAGE;
    } catch (e) {
      return DEFAULT_MESSAGE;
    }
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState('');
  const [syncError, setSyncError] = useState('');

  // Admin session state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load latest settings from Cloud DB on app mount for all devices globally
  useEffect(() => {
    let isMounted = true;

    const fetchGlobalConfig = async () => {
      setIsSyncing(true);
      try {
        const res = await fetch(CLOUD_GET_URL, { cache: 'no-store' });
        if (res.ok) {
          const raw = await res.json();
          if (raw && typeof raw === 'string' && raw.length > 0) {
            const decodedJson = hexToStr(raw);
            if (decodedJson) {
              const parsed = JSON.parse(decodedJson);
              if (parsed) {
                const num = parsed.whatsappNumber;
                const msg = parsed.whatsappMessage;

                if (num && isMounted) {
                  const formattedNum = formatWhatsAppNumber(num);
                  setWhatsappNumber(formattedNum);
                  try {
                    localStorage.setItem('nexora_whatsapp_number', formattedNum);
                  } catch (e) {}
                }

                if (msg && isMounted) {
                  setWhatsappMessage(msg);
                  try {
                    localStorage.setItem('nexora_whatsapp_message', msg);
                  } catch (e) {}
                }

                if (isMounted) {
                  setLastSyncedAt(new Date().toLocaleTimeString());
                  setSyncError('');
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch global config from cloud:', err);
        if (isMounted) setSyncError('Cloud sync offline (using cached settings)');
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    fetchGlobalConfig();

    // Auto sync on tab focus or window activation
    const handleFocus = () => fetchGlobalConfig();
    window.addEventListener('focus', handleFocus);

    // Periodic sync every 25 seconds
    const interval = setInterval(fetchGlobalConfig, 25000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const saveWhatsAppConfig = async (newNumber, newMessage, countryCode = '91') => {
    const cleanNumber = formatWhatsAppNumber(newNumber, countryCode);
    const trimmedMsg = newMessage.trim() || DEFAULT_MESSAGE;

    // Update local state and localStorage immediately
    setWhatsappNumber(cleanNumber);
    setWhatsappMessage(trimmedMsg);
    try {
      localStorage.setItem('nexora_whatsapp_number', cleanNumber);
      localStorage.setItem('nexora_whatsapp_message', trimmedMsg);
    } catch (e) {}

    setIsSaving(true);
    setSyncError('');

    try {
      const payload = JSON.stringify({
        whatsappNumber: cleanNumber,
        whatsappMessage: trimmedMsg,
        updatedAt: new Date().toISOString(),
      });

      const hexData = strToHex(payload);

      const res = await fetch(`${CLOUD_SET_URL}${hexData}`, {
        method: 'POST',
        headers: {
          'Content-Length': '0',
        },
      });

      if (!res.ok) {
        throw new Error(`Cloud server returned ${res.status}`);
      }

      setLastSyncedAt(new Date().toLocaleTimeString());
      setIsSaving(false);
      return { success: true, message: '✅ WhatsApp number & default SMS saved & published globally!' };
    } catch (err) {
      console.error('Failed to save to cloud:', err);
      setIsSaving(false);
      setSyncError('Cloud save failed (saved locally only)');
      return { success: true, message: '⚠️ Saved locally, but cloud sync encountered an error.' };
    }
  };

  const updateWhatsAppNumber = (newNumber) => {
    saveWhatsAppConfig(newNumber, whatsappMessage);
  };

  const updateWhatsAppMessage = (newMessage) => {
    saveWhatsAppConfig(whatsappNumber, newMessage);
  };

  const loginAdmin = (username, password) => {
    if (username === HARDCODED_ADMIN.username && password === HARDCODED_ADMIN.password) {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'Incorrect username or password. Please try again.' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const getWhatsAppLink = (customText) => {
    const textToEncode =
      customText !== undefined && customText !== null && customText.trim() !== ''
        ? customText
        : whatsappMessage;
    const cleanNumber = formatWhatsAppNumber(whatsappNumber);
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(textToEncode)}`;
  };

  return (
    <ConfigContext.Provider
      value={{
        whatsappNumber,
        updateWhatsAppNumber,
        whatsappMessage,
        updateWhatsAppMessage,
        saveWhatsAppConfig,
        isSyncing,
        isSaving,
        lastSyncedAt,
        syncError,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
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
