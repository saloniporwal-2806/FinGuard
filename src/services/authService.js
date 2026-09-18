/**
 * FinGuard AI Authentication & User Profile Service
 * Prototype-safe authentication service with local persistence.
 * Structured cleanly to easily connect to a REST/Firebase/Supabase backend later.
 */

const STORAGE_USERS_KEY = "finguard_users_v1";
const STORAGE_SESSION_KEY = "finguard_active_session_v1";

// Simple client-side password hashing for prototype security
function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return "hash_" + Math.abs(hash).toString(16);
}

// Initial demo accounts
const DEFAULT_USERS = [
  {
    id: "user_demo_1",
    name: "Alex Morgan",
    email: "alex@example.com",
    passwordHash: hashPassword("finguard123"),
    avatar: null,
    level: "Level 2 - Learner",
    createdAt: new Date().toISOString(),
  },
];

export const AuthService = {
  /**
   * Get all registered users from storage
   */
  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USERS;
    }
  },

  /**
   * Get current authenticated user session
   */
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  /**
   * Authenticate existing user with email and password
   */
  login(email, password) {
    if (!email || !password) {
      return { success: false, error: "Please provide both email and password." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (password.length < 4) {
      return { success: false, error: "Password must be at least 4 characters." };
    }

    const users = this.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!existing) {
      return {
        success: false,
        error: "No account found with this email. Click 'Create Account' to sign up.",
      };
    }

    const hashed = hashPassword(password);
    if (existing.passwordHash !== hashed) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    // Set active session
    const sessionUser = { ...existing };
    delete sessionUser.passwordHash;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  },

  /**
   * Register a new user account
   */
  signup(name, email, password) {
    if (!name || !name.trim()) {
      return { success: false, error: "Please enter your full name." };
    }

    const cleanEmail = (email || "").trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (!password || password.length < 4) {
      return { success: false, error: "Password must be at least 4 characters long." };
    }

    const users = this.getUsers();
    const alreadyExists = users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      return {
        success: false,
        error: "An account with this email already exists. Please log in.",
      };
    }

    const newUser = {
      id: "user_" + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      passwordHash: hashPassword(password),
      avatar: null,
      level: "Level 1 - Starter",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    // Auto-login newly registered user
    const sessionUser = { ...newUser };
    delete sessionUser.passwordHash;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));

    return { success: true, user: sessionUser };
  },

  /**
   * Update active user's profile details (Name, Email, Avatar)
   */
  updateProfile(userId, { name, email, avatar }) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return { success: false, error: "User profile not found." };
    }

    if (name && name.trim()) {
      users[index].name = name.trim();
    }

    if (email && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      // Check if email taken by another user
      const duplicate = users.find(
        (u) => u.id !== userId && u.email.toLowerCase() === cleanEmail
      );
      if (duplicate) {
        return { success: false, error: "This email is already in use by another account." };
      }
      users[index].email = cleanEmail;
    }

    if (avatar !== undefined) {
      users[index].avatar = avatar;
    }

    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    const updatedSession = { ...users[index] };
    delete updatedSession.passwordHash;
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updatedSession));

    return { success: true, user: updatedSession };
  },

  /**
   * Terminate active user session
   */
  logout() {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  },
};
