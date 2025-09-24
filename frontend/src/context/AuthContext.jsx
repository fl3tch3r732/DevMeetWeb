import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

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
    
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false); 
    }
  }, []);


  const login = ({ token: newToken, user: userData }) => {
    try {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to save auth data:', error);
      throw error; 
    }
  };

  // Logout with error handling
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

  // Helper function to check if user is authenticated
  const isAuthenticated = () => {
    return !!(token && user);
  };

  // Function to update user data (useful for profile updates)
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
    loading,
    login,
    logout,
    isAuthenticated,
    updateUser, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;