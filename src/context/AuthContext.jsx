import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  // Load token and user from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken) {
        setToken(storedToken);
      }
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false); // ✅ Set loading to false after initialization
    }
  }, []);

  // ✅ Login handler with better error handling
  const login = ({ token: newToken, user: userData }) => {
    try {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to save auth data:', error);
      throw error; // Re-throw so calling code can handle it
    }
  };

  // ✅ Logout with error handling
  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
    setToken(null);
    setUser(null);
  };

  // ✅ Helper function to check if user is authenticated
  const isAuthenticated = () => {
    return !!(token && user);
  };

  // ✅ Function to update user data (useful for profile updates)
  const updateUser = (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      localStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
    } catch (error) {
      console.error('Failed to update user data:', error);
      throw error;
    }
  };

  const value = {
    token,
    user,
    loading, // ✅ Expose loading state
    login,
    logout,
    isAuthenticated,
    updateUser, // ✅ Helper for updating user data
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;