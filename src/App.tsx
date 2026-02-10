import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Stats } from './pages/Stats';
import { Social } from './pages/Social';
import { Activities } from './pages/Activities';
import { Profile } from './pages/Profile';
import { AuthCallback } from './components/auth/AuthCallback';
import './styles/globals.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 mt-16 p-4 md:p-8">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<AuthCallback />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Stats />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/social"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Social />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Activities />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
