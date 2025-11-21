import React, { createContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme, useMediaQuery, IconButton, CssBaseline, Box, Button, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Import components
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Team from './pages/team';

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
          p: 3, 
          width: { 
            xs: '100%',
            md: open ? `calc(100% - 260px)` : `calc(100% - 70px)`
          },
          ml: { 
            xs: 0,
            md: open ? '260px' : '70px' 
          },
          transition: theme.transitions.create(['margin', 'width'], {
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
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/tasks"
              element={
                <Layout>
                  <Tasks />
                </Layout>
              }
            />
            <Route
              path="/team/*"
              element={
                <Layout>
                  <Team />
                </Layout>
              }
            >
              <Route path="*" element={<Team />} />
            </Route>
            <Route
              path="/reports"
              element={
                <Layout>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4">Reports</Typography>
                    {/* Reports content will go here */}
                  </Box>
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h4">Settings</Typography>
                    {/* Settings content will go here */}
                  </Box>
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <Box sx={{ textAlign: 'center', pt: 10 }}>
                    <Typography variant="h3">404 - Page Not Found</Typography>
                    <Button 
                      component={Link} 
                      to="/dashboard" 
                      variant="contained" 
                      color="primary" 
                      sx={{ mt: 3 }}
                    >
                      Go to Dashboard
                    </Button>
                  </Box>
                </Layout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
