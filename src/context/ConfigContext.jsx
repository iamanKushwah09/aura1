import React, { createContext, useContext, useState, useEffect } from 'react';

const ConfigContext = createContext();

const DEFAULT_NUMBER = '919876543210';
const DEFAULT_MESSAGE = 'Hello! I am interested in your services.';

// Helper function to automatically format and ensure valid country code for WhatsApp
export const formatWhatsAppNumber = (rawNumber, defaultCountryCode = '91') => {
  if (!rawNumber) return defaultCountryCode + '9876543210';
  let clean = rawNumber.toString().replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }
  // If 10 digits (e.g. 8923939941), automatically add country code
  if (clean.length === 10) {
    clean = defaultCountryCode + clean;
  }
  return clean;
};

const CLOUD_OBJECT_ID = 'ff8081819f7e10ae019f8fe337941bbc';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

// Hardcoded Credentials directly in code (No Database)
export const HARDCODED_ADMIN = {
  username: 'admin',
  password: 'admin123',
};

export const ConfigProvider = ({ children }) => {
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_whatsapp_number');
      return stored ? formatWhatsAppNumber(stored) : DEFAULT_NUMBER;
    } catch (e) {
      return DEFAULT_NUMBER;
    }
  });

  const [whatsappMessage, setWhatsappMessage] = useState(() => {
    try {
      return localStorage.getItem('aura_whatsapp_message') || DEFAULT_MESSAGE;
    } catch (e) {
      return DEFAULT_MESSAGE;
    }
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState('');
  const [syncError, setSyncError] = useState('');

  // Admin session state - requires login when opening /admin
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load latest settings from Cloud DB on app mount for any user on any device
  useEffect(() => {
    let isMounted = true;
    const fetchGlobalConfig = async () => {
      setIsSyncing(true);
      try {
        const res = await fetch(CLOUD_API_URL, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json && json.data) {
            const num = json.data.whatsappNumber;
            const msg = json.data.whatsappMessage;
            if (num && isMounted) {
              const formattedNum = formatWhatsAppNumber(num);
              setWhatsappNumber(formattedNum);
              try { localStorage.setItem('aura_whatsapp_number', formattedNum); } catch (e) {}
            }
            if (msg && isMounted) {
              setWhatsappMessage(msg);
              try { localStorage.setItem('aura_whatsapp_message', msg); } catch (e) {}
            }
            if (isMounted) {
              setLastSyncedAt(new Date().toLocaleTimeString());
              setSyncError('');
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

    // Background polling every 10 seconds for real-time updates across devices
    const interval = setInterval(fetchGlobalConfig, 10000);

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
      localStorage.setItem('aura_whatsapp_number', cleanNumber);
      localStorage.setItem('aura_whatsapp_message', trimmedMsg);
    } catch (e) {}

    setIsSaving(true);
    setSyncError('');

    try {
      const res = await fetch(CLOUD_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'aura_whatsapp_config_global',
          data: {
            whatsappNumber: cleanNumber,
            whatsappMessage: trimmedMsg,
            updatedAt: new Date().toISOString(),
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      setLastSyncedAt(new Date().toLocaleTimeString());
      setIsSaving(false);
      return { success: true, message: '✅ WhatsApp number & default SMS saved & published globally!' };
    } catch (err) {
      console.error('Failed to save to cloud:', err);
      setIsSaving(false);
      setSyncError('Cloud save failed (saved locally only)');
      return { success: true, message: '⚠️ Saved locally on this browser, but cloud sync failed.' };
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
    return { success: false, message: 'Galat Username ya Password hai! (Username: admin | Password: admin123)' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const getWhatsAppLink = (customText) => {
    const textToEncode = (customText !== undefined && customText !== null && customText.trim() !== '') ? customText : whatsappMessage;
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
          agentName: 'AURA Support Team',
          heroTitle: 'Transforming Ideas into Digital Masterpieces',
          heroSubtitle: 'Supercharge your business with ultra-responsive, high-performance web applications designed for maximum mobile conversion.',
          heroBadge: '🔥 Mobile-First Digital Studio',
        },
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
