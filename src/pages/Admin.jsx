import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Lock, User, Save, ArrowLeft, LogOut, CheckCircle, ExternalLink, ShieldCheck, Eye, EyeOff, KeyRound, MessageSquare, Globe, RefreshCw } from 'lucide-react';
import { useConfig, HARDCODED_ADMIN, formatWhatsAppNumber } from '../context/ConfigContext';

export const COUNTRY_CODES = [
  { code: '91', country: 'India', flag: '🇮🇳', label: '🇮🇳 India (+91)' },
  { code: '1', country: 'USA / Canada', flag: '🇺🇸', label: '🇺🇸 USA / Canada (+1)' },
  { code: '44', country: 'UK', flag: '🇬🇧', label: '🇬🇧 UK (+44)' },
  { code: '971', country: 'UAE', flag: '🇦🇪', label: '🇦🇪 UAE (+971)' },
  { code: '966', country: 'Saudi Arabia', flag: '🇸🇦', label: '🇸🇦 Saudi Arabia (+966)' },
  { code: '974', country: 'Qatar', flag: '🇶🇦', label: '🇶🇦 Qatar (+974)' },
  { code: '965', country: 'Kuwait', flag: '🇰🇼', label: '🇰🇼 Kuwait (+965)' },
  { code: '968', country: 'Oman', flag: '🇴🇲', label: '🇴🇲 Oman (+968)' },
  { code: '973', country: 'Bahrain', flag: '🇧🇭', label: '🇧🇭 Bahrain (+973)' },
  { code: '65', country: 'Singapore', flag: '🇸🇬', label: '🇸🇬 Singapore (+65)' },
  { code: '60', country: 'Malaysia', flag: '🇲🇾', label: '🇲🇾 Malaysia (+60)' },
  { code: '61', country: 'Australia', flag: '🇦🇺', label: '🇦🇺 Australia (+61)' },
  { code: '49', country: 'Germany', flag: '🇩🇪', label: '🇩🇪 Germany (+49)' },
  { code: '33', country: 'France', flag: '🇫🇷', label: '🇫🇷 France (+33)' },
  { code: '81', country: 'Japan', flag: '🇯🇵', label: '🇯🇵 Japan (+81)' },
  { code: '977', country: 'Nepal', flag: '🇳🇵', label: '🇳🇵 Nepal (+977)' },
  { code: '880', country: 'Bangladesh', flag: '🇧🇩', label: '🇧🇩 Bangladesh (+880)' },
  { code: '92', country: 'Pakistan', flag: '🇵🇰', label: '🇵🇰 Pakistan (+92)' },
  { code: '94', country: 'Sri Lanka', flag: '🇱🇰', label: '🇱🇰 Sri Lanka (+94)' },
  { code: '55', country: 'Brazil', flag: '🇧🇷', label: '🇧🇷 Brazil (+55)' },
];

export const Admin = () => {
  const {
    whatsappNumber,
    whatsappMessage,
    saveWhatsAppConfig,
    isSyncing,
    isSaving,
    lastSyncedAt,
    syncError,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    getWhatsAppLink,
  } = useConfig();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [countryCode, setCountryCode] = useState('91');
  const [numberInput, setNumberInput] = useState('');
  const [messageInput, setMessageInput] = useState(whatsappMessage);
  const [toastMessage, setToastMessage] = useState('');

  // Keep input fields updated when cloud data loads and parse country code
  useEffect(() => {
    if (whatsappNumber) {
      const clean = whatsappNumber.replace(/[^0-9]/g, '');
      const matched = COUNTRY_CODES.find((c) => clean.startsWith(c.code) && clean.length > c.code.length);
      if (matched) {
        setCountryCode(matched.code);
        setNumberInput(clean.slice(matched.code.length));
      } else {
        setCountryCode('91');
        setNumberInput(clean);
      }
    }
  }, [whatsappNumber]);

  useEffect(() => {
    setMessageInput(whatsappMessage);
  }, [whatsappMessage]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdmin(usernameInput.trim(), passwordInput.trim());
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const cleanLocal = numberInput.replace(/[^0-9]/g, '');
    let fullNum = cleanLocal;
    if (!cleanLocal.startsWith(countryCode) || cleanLocal.length === 10) {
      fullNum = countryCode + cleanLocal;
    }
    const res = await saveWhatsAppConfig(fullNum, messageInput, countryCode);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(''), 5000);
  };

  // STEP 1: Login Form (Light theme with Green & Blue accents)
  if (!isAdminLoggedIn) {
    return (
      <div
        className="app-container"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 50%, #eff6ff 100%)',
        }}
      >
        <div style={{ position: 'absolute', top: '24px', left: '24px' }}>
          <Link to="/" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
            <ArrowLeft size={16} /> Back to Website
          </Link>
        </div>

        <div
          className="glass-card"
          style={{
            maxWidth: '430px',
            width: '100%',
            padding: '38px 30px',
            border: '1.5px solid rgba(16, 185, 129, 0.25)',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.1), 0 0 20px -2px rgba(16, 185, 129, 0.12)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <div
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #2563eb 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
              }}
            >
              <KeyRound size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', marginBottom: '6px' }}>
              Admin Verification
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: '500' }}>
              Enter Username & Password to access WhatsApp settings.
            </p>
          </div>

          {/* Hardcoded Credentials Alert Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(37, 99, 235, 0.06) 100%)',
              border: '1.5px dashed rgba(16, 185, 129, 0.35)',
              borderRadius: '14px',
              padding: '14px',
              marginBottom: '20px',
              fontSize: '0.86rem',
              color: '#065f46',
            }}
          >
            <div style={{ fontWeight: '800', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} color="#059669" /> Login Credentials:
            </div>
            <div>Username: <strong style={{ color: '#0f172a' }}>{HARDCODED_ADMIN.username}</strong></div>
            <div>Password: <strong style={{ color: '#0f172a' }}>{HARDCODED_ADMIN.password}</strong></div>
          </div>

          {loginError && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#991b1b',
                padding: '12px 14px',
                borderRadius: '12px',
                fontSize: '0.88rem',
                marginBottom: '18px',
                fontWeight: '700',
              }}
            >
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                USERNAME
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  placeholder="Enter Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.98rem',
                    fontWeight: '600',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 42px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.98rem',
                    fontWeight: '600',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px', width: '100%', justifyContent: 'center', padding: '14px' }}>
              Sign In to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 2: WhatsApp Settings Dashboard
  return (
    <div className="app-container" style={{ paddingBottom: '60px' }}>
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
          padding: '16px 20px',
        }}
      >
        <div className="max-w-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #2563eb 100%)', color: '#fff', padding: '8px', borderRadius: '12px', display: 'flex' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '900', color: '#0f172a' }}>
                Admin Dashboard
              </h1>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="pulse-dot"></span> Authenticated Session
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.86rem' }}>
              <ArrowLeft size={16} /> View Website
            </Link>

            <button onClick={logoutAdmin} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.86rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-content" style={{ marginTop: '40px', padding: '0 20px', maxWidth: '660px' }}>
        {toastMessage && (
          <div
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              padding: '14px 20px',
              borderRadius: '16px',
              marginBottom: '24px',
              fontWeight: '700',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle size={22} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Global Cloud Sync Status Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
            border: '1.5px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            padding: '22px 24px',
            marginBottom: '24px',
            boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={15} /> Global Cloud Sync (Vercel & All Devices)
            </div>
            {isSyncing ? (
              <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RefreshCw size={12} className="spin" /> Syncing...
              </span>
            ) : (
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>
                🟢 Synced {lastSyncedAt ? `at ${lastSyncedAt}` : 'Online'}
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '700', marginBottom: '8px' }}>
            📱 Active Number: <span style={{ color: '#059669', fontWeight: '800' }}>+{whatsappNumber || 'Not set'}</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', background: '#ffffff', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            💬 <strong style={{ color: '#0f172a' }}>Current Default SMS:</strong> "{whatsappMessage}"
          </div>
        </div>

        <div className="glass-card" style={{ padding: '34px' }}>
          <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800' }}>
              <Phone size={24} color="#059669" /> Edit WhatsApp Settings
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', fontWeight: '500' }}>
              Update your WhatsApp number and default customer message. Synchronized across all live visitors.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
                WHATSAPP MOBILE NUMBER & COUNTRY CODE
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{
                    padding: '14px 12px',
                    borderRadius: '14px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    outline: 'none',
                    cursor: 'pointer',
                    minWidth: '160px',
                    flexShrink: 0,
                  }}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code + c.country} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <div style={{ position: 'relative', flex: '1 1 200px' }}>
                  <Phone size={20} color="#059669" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px 14px 48px',
                      borderRadius: '14px',
                      border: '1.5px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#0f172a',
                      fontSize: '1.02rem',
                      fontWeight: '700',
                      outline: 'none',
                    }}
                    placeholder="Enter 10-digit number (e.g. 8923939941)"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                  />
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', fontWeight: '600' }}>
                💡 Selected full WhatsApp number: <strong style={{ color: '#059669' }}>+{countryCode} {numberInput || '8923939941'}</strong>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#334155', marginBottom: '8px' }}>
                DEFAULT WHATSAPP SMS / MESSAGE
              </label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={20} color="#2563eb" style={{ position: 'absolute', left: '16px', top: '18px' }} />
                <textarea
                  required
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    borderRadius: '14px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: '1rem',
                    fontWeight: '600',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                  placeholder="Enter default SMS message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', fontWeight: '600' }}>
                💬 This default SMS will be automatically populated whenever a customer clicks the WhatsApp button.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', paddingTop: '10px' }}>
              <button
                type="submit"
                className="btn-whatsapp"
                disabled={isSaving}
                style={{ padding: '14px 30px', fontSize: '1rem', opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={20} className="spin" /> Publishing Globally...
                  </>
                ) : (
                  <>
                    <Save size={20} /> Save Settings
                  </>
                )}
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                <ExternalLink size={18} /> Test WhatsApp Button Link
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
