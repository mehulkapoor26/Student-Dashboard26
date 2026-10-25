// Authentication storage and helpers for Academix Student Portal

export const DEFAULT_DEMO_USER = {
  name: 'Rohit Verma',
  email: 'rohit.verma@apex.edu',
  rollNumber: '25109928',
  department: 'School of Computer Science & Tech',
  program: 'B.Tech in Artificial Intelligence & Machine Learning',
  section: 'U25AIML-G8',
  mentor: 'Dr. Lakshita',
  gender: 'Male',
  dob: '14 October 2004',
  bloodGroup: 'O+',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  password: 'password123'
};

const USERS_STORAGE_KEY = 'academix_registered_students';
const SESSION_STORAGE_KEY = 'academix_active_session';

/**
 * Retrieve all registered students from localStorage (or initialize with default demo account)
 */
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      const initial = [DEFAULT_DEMO_USER];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load registered users from localStorage:', err);
    return [DEFAULT_DEMO_USER];
  }
}

/**
 * Check if email is an official university email ending with @apex.edu
 */
export function isValidUniversityEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  return clean.endsWith('@apex.edu') || clean.endsWith('@apex.edu.in');
}

/**
 * Register a new student account
 */
export function registerStudent(newStudent) {
  const cleanEmail = (newStudent.email || '').trim().toLowerCase();
  if (!isValidUniversityEmail(cleanEmail)) {
    throw new Error('Only official university email addresses ending with @apex.edu are allowed. Personal emails like Gmail are not permitted.');
  }

  const users = getRegisteredUsers();
  // Check if email or roll number is already in use
  const existing = users.find(
    u => u.email.toLowerCase() === cleanEmail ||
         u.rollNumber.trim() === newStudent.rollNumber.trim()
  );
  if (existing) {
    if (existing.email.toLowerCase() === cleanEmail) {
      throw new Error('An account with this university email address already exists.');
    }
    throw new Error('An account with this student Roll / ID number already exists.');
  }

  const enrichedStudent = {
    ...DEFAULT_DEMO_USER,
    ...newStudent,
    email: cleanEmail,
    avatarUrl: newStudent.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newStudent.name)}&backgroundColor=2563eb,7c3aed,db2777`
  };

  const updatedUsers = [...users, enrichedStudent];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  return enrichedStudent;
}

/**
 * Authenticate student using Email or Roll Number and Password
 */
export function authenticateStudent(identifier, password) {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // If identifier is an email address, validate domain
  if (cleanId.includes('@') && !isValidUniversityEmail(cleanId)) {
    throw new Error('Invalid email domain. Only official university email addresses ending with @apex.edu are permitted (Gmail is not allowed).');
  }

  const users = getRegisteredUsers();
  const matchedUser = users.find(u => 
    (u.email.toLowerCase() === cleanId || u.rollNumber.toLowerCase() === cleanId)
  );

  if (!matchedUser) {
    throw new Error('No student account found with this Email or Roll Number.');
  }

  if (matchedUser.password !== cleanPass) {
    throw new Error('Incorrect password. Please check your credentials and try again.');
  }

  return matchedUser;
}

/**
 * Get the currently logged in student session (or null)
 */
export function getActiveSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

/**
 * Set the currently logged in student session
 */
export function setActiveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

/**
 * Update student profile in registered users list and active session
 */
export function updateStudentProfile(updatedData) {
  try {
    const users = getRegisteredUsers();
    const index = users.findIndex(u => 
      (updatedData.email && u.email && u.email.toLowerCase() === updatedData.email.toLowerCase()) || 
      (updatedData.rollNumber && u.rollNumber === updatedData.rollNumber)
    );
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
    } else {
      users.push(updatedData);
    }
    
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    setActiveSession(updatedData);
    return updatedData;
  } catch (err) {
    console.error('Failed to update student profile in storage:', err);
    setActiveSession(updatedData);
    return updatedData;
  }
}


