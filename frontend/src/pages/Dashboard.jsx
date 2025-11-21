import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CircularProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const StyledRefreshIcon = styled(RefreshIcon)({
  '&.spin': {
    animation: `${spin} 1s linear infinite`,
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: { xs: theme.spacing(2), md: theme.spacing(3) },
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card sx={{ height: '100%', borderRadius: 3, borderLeft: `4px solid ${color}` }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <Icon sx={{ color: color, fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h6" component="div" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    teamMembers: 0,
    productivity: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        // setStats(data.stats);
        // setRecentActivities(data.recentActivities);
        
        // For now, set empty data
        setStats({
          totalTasks: 0,
          completedTasks: 0,
          teamMembers: 0,
          productivity: 0
        });
        setRecentActivities([]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Replace with actual refresh logic
    // fetchData().finally(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 200px)' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      pt: { xs: 7, sm: 8 },
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Dashboard Overview
        </Typography>
        <Box>
          <IconButton 
            color="primary" 
            aria-label="refresh" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <StyledRefreshIcon className={refreshing ? 'spin' : ''} />
          </IconButton>
        </Box>
      </Box>
      
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 3 }}>
        {[
          { title: 'Total Tasks', value: stats.totalTasks, icon: AssignmentIcon, color: theme.palette.primary.main },
          { title: 'Completed', value: `${stats.completedTasks}/${stats.totalTasks}`, icon: CheckCircleIcon, color: '#4caf50' },
          { title: 'Team Members', value: stats.teamMembers, icon: GroupIcon, color: '#9c27b0' },
          { title: 'Productivity', value: `${stats.productivity}%`, icon: TrendingUpIcon, color: '#ff9800' }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex' }}>
            <StatCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ width: '100%', mx: 0 }}>
        <Grid item xs={12} lg={8} sx={{ px: 1 }}>
          <StyledPaper sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}>
              <Typography variant="h6" fontWeight="bold">
                Task Overview
              </Typography>
            </Box>
            <Box sx={{ 
              flexGrow: 1,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              p: 2,
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${theme.palette.divider}`
            }}>
              <Typography color="textSecondary">
                Task completion chart will be displayed here
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} lg={4} sx={{ px: 1 }}>
          <StyledPaper sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Recent Activity
              </Typography>
              <Button size="small" color="primary">View All</Button>
            </Box>
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ overflowY: 'auto', maxHeight: 400 }}>
                {recentActivities.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      py: 1.5,
                      px: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        borderRadius: '50%',
                        minWidth: 36,
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0,
                      }}
                    >
                      {activity.type === 'task' ? (
                        <AssignmentIcon fontSize="small" />
                      ) : activity.type === 'team' ? (
                        <GroupIcon fontSize="small" />
                      ) : (
                        <TrendingUpIcon fontSize="small" />
                      )}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight="medium" noWrap>
                        {activity.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
