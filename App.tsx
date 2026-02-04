
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User, UserRole } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import IdeaVault from './pages/IdeaVault';
import AICoach from './pages/AICoach';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Opportunities from './pages/Opportunities';
import Meetings from './pages/Meetings';
import ApplyToVC from './pages/ApplyToVC';

// Components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Auth Context
interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (data: Partial<User> & { password?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const ProtectedRoute = ({ children, roles }: { children?: React.ReactNode, roles?: UserRole[] }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="p-4 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, pass: string) => {
    const mockUser: User = {
      id: '1',
      name: email.includes('vc') ? 'Alex Investor' : 'John Founder',
      email,
      role: email.includes('vc') ? UserRole.INVESTOR : UserRole.FOUNDER,
      isPremium: false,
      profileCompleted: true,
      avatar: `https://picsum.photos/seed/${email}/200`
    };
    setUser(mockUser);
    localStorage.setItem('vc_user', JSON.stringify(mockUser));
  };

  const signup = async (data: any) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: data.role as UserRole,
      isPremium: false,
      profileCompleted: false,
      avatar: `https://picsum.photos/seed/${data.email}/200`
    };
    setUser(newUser);
    localStorage.setItem('vc_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vc_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('vc_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout><Dashboard /></MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/vault" element={
            <ProtectedRoute>
              <MainLayout><IdeaVault /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/coach" element={
            <ProtectedRoute roles={[UserRole.FOUNDER]}>
              <MainLayout><AICoach /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/apply" element={
            <ProtectedRoute roles={[UserRole.FOUNDER]}>
              <MainLayout><ApplyToVC /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/opportunities" element={
            <ProtectedRoute roles={[UserRole.FOUNDER]}>
              <MainLayout><Opportunities /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/unicorn" element={
            <ProtectedRoute>
              <MainLayout><Meetings /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/messages" element={
            <ProtectedRoute>
              <MainLayout><Messages /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout><Profile /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}
