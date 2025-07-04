import { useContext } from 'react';
import AuthContext from './AuthContext';
import { AuthProvider } from './AuthContext';

export const useAuth = () => useContext(AuthContext);
