import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

// ─── Seed Admin Accounts ─────────────────────────────────────────────────────
// Default admin loaded on first run. Additional admins can be created via Sign Up.
// To connect a real backend later: replace localStorage reads/writes with API calls.
const SEED_ADMIN = {
  id: 'admin-seed-1',
  name: 'Nexus Admin',
  email: 'admin@nexusacademy.edu',
  // In production: NEVER store plain text passwords. Use hashed + server auth.
  password: 'Admin@123',
  role: 'Super Admin',
  avatar: null, // null = show initials avatar
  createdAt: '2026-01-01',
};

const STORAGE_KEYS = {
  accounts: 'nexus_admin_accounts',
  session:  'nexus_admin_session',
};

const loadAccounts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.accounts);
    if (saved) return JSON.parse(saved);
  } catch (_) {}
  // First run — seed default admin
  const defaults = [SEED_ADMIN];
  localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(defaults));
  return defaults;
};

const loadSession = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.session);
    return saved ? JSON.parse(saved) : null;
  } catch (_) {
    return null;
  }
};

// ─── Provider ────────────────────────────────────────────────────────────────
export const AdminAuthProvider = ({ children }) => {
  const [adminAccounts, setAdminAccounts] = useState(loadAccounts);
  const [adminUser, setAdminUser]         = useState(loadSession);

  const isAdminAuthenticated = !!adminUser;

  // Persist accounts whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(adminAccounts));
    } catch (_) {}
  }, [adminAccounts]);

  // ── Login ─────────────────────────────────────────────────────────────────
  /**
   * Validates email + password against stored accounts.
   * Returns { success: true, user } or { success: false, error: string }
   * → Replace this with an API call when backend is ready.
   */
  const loginAdmin = (email, password) => {
    const account = adminAccounts.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!account) {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }
    const session = { id: account.id, name: account.name, email: account.email, role: account.role, avatar: account.avatar };
    setAdminUser(session);
    try { localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session)); } catch (_) {}
    return { success: true, user: session };
  };

  // ── Register ──────────────────────────────────────────────────────────────
  /**
   * Creates a new admin account.
   * Returns { success: true } or { success: false, error: string }
   * → Replace with POST /api/admin/register when backend is ready.
   */
  const registerAdmin = (name, email, password) => {
    const exists = adminAccounts.some(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: 'An admin account with this email already exists.' };
    }
    const newAccount = {
      id: `admin-${Date.now()}`,
      name,
      email,
      password, // Store hashed in production
      role: 'Admin',
      avatar: null,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...adminAccounts, newAccount];
    setAdminAccounts(updated);
    // Auto-login after registration
    const session = { id: newAccount.id, name: newAccount.name, email: newAccount.email, role: newAccount.role, avatar: null };
    setAdminUser(session);
    try { localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session)); } catch (_) {}
    return { success: true };
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logoutAdmin = () => {
    setAdminUser(null);
    try { localStorage.removeItem(STORAGE_KEYS.session); } catch (_) {}
  };

  // ── Update profile ────────────────────────────────────────────────────────
  /**
   * Updates the currently logged-in admin's name/avatar in accounts + session.
   * → Replace with PATCH /api/admin/profile when backend is ready.
   */
  const updateAdminProfile = (updates) => {
    if (!adminUser) return;
    setAdminAccounts(prev =>
      prev.map(a => a.id === adminUser.id ? { ...a, ...updates } : a)
    );
    const updatedSession = { ...adminUser, ...updates };
    setAdminUser(updatedSession);
    try { localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(updatedSession)); } catch (_) {}
  };

  // ── Change password ───────────────────────────────────────────────────────
  /**
   * Validates old password, then updates to new password.
   * Returns { success: true } or { success: false, error: string }
   * → Replace with POST /api/admin/change-password when backend is ready.
   */
  const changeAdminPassword = (oldPassword, newPassword) => {
    if (!adminUser) return { success: false, error: 'Not authenticated.' };
    const account = adminAccounts.find(a => a.id === adminUser.id);
    if (!account || account.password !== oldPassword) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    setAdminAccounts(prev =>
      prev.map(a => a.id === adminUser.id ? { ...a, password: newPassword } : a)
    );
    return { success: true };
  };

  return (
    <AdminAuthContext.Provider value={{
      adminUser,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      registerAdmin,
      updateAdminProfile,
      changeAdminPassword,
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
