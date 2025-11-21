import React, { createContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme, useMediaQuery, IconButton, CssBaseline, Box, Button, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Import components
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import AuthGuard from './components/auth/AuthGuard';
import LogoutButton from './components/auth/LogoutButton';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TeamMembers from './pages/team/TeamMembers'; // Fixed import path
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';

// Import auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Create a context for the color mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Create a theme instance with orange as primary color
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#ff6d00',
            light: '#ff9e40',
            dark: '#c43c00',
            contrastText: '#fff',
          },
          secondary: {
            main: '#ff9100',
            light: '#ffc246',
            dark: '#c56200',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#ff9e40',
            light: '#ffc947',
            dark: '#c67100',
            contrastText: '#000',
          },
          secondary: {
            main: '#ffb74d',
            light: '#ffe97d',
            dark: '#c88719',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
});

// Create theme instance with mode
const getTheme = (mode) =>
  createTheme({
    ...getDesignTokens(mode),
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

// Main layout component
const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    // Close sidebar on mobile by default
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={open} onToggle={handleDrawerToggle} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          px: 0, // Remove all horizontal padding
          py: 1, // Minimal vertical padding
          minWidth: 0, // Prevents overflow issues
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Topbar onMenuClick={handleDrawerToggle} />
        <Box sx={{ mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  const [mode, setMode] = React.useState('light');
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/tasks"
              element={
                <AuthGuard>
                  <Layout>
                    <Tasks />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/analytics"
              element={
                <AuthGuard>
                  <Layout>
                    <Analytics />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/calendar"
              element={
                <AuthGuard>
                  <Layout>
                    <Calendar />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/team"
              element={
                <AuthGuard>
                  <Layout>
                    <TeamMembers /> {/* Direct import of TeamMembers component */}
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/reports"
              element={
                <AuthGuard>
                  <Layout>
                    <Reports />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/notifications"
              element={
                <AuthGuard>
                  <Layout>
                    <Notifications />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/help"
              element={
                <AuthGuard>
                  <Layout>
                    <Help />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <Layout>
                    <Profile />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <Layout>
                    <Settings />
                  </Layout>
                </AuthGuard>
              }
            />
            
            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
