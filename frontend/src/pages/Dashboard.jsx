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
  Button,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LocalFireDepartment as FireIcon,
  DirectionsRun as RunIcon,
  Favorite as HeartIcon,
  WaterDrop as WaterIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
  FitnessCenter as FitnessCenterIcon,
  AccessTime as TimeIcon,
  Whatshot as WhatshotIcon,
  EmojiEvents as TrophyIcon,
  Person as PersonIcon
} from '@mui/icons-material';

// Card component for stats
const StatCard = ({ title, value, icon: Icon, color, unit }) => (
  <Card sx={{ 
    borderRadius: 3, 
    p: 2,
    height: '100%',
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: `linear-gradient(135deg, ${color} 0%, ${color}40 100%)`,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    }
  }}>
    <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ lineHeight: 1.2, mb: 1 }}>
            {value}
            <Typography component="span" variant="h6" sx={{ opacity: 0.9, ml: 0.5, fontSize: '0.8em' }}>
              {unit}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.9rem' }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          flexShrink: 0,
          ml: 1,
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            fontSize: '1.5rem'
          }
        }}>
          <Icon sx={{ color: 'white' }} />
        </Box>
      </Box>
    </Box>
  </Card>
);

// Activity item component
const ActivityItem = ({ icon: Icon, title, time, value, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
    <Box sx={{
      width: 40,
      height: 40,
      borderRadius: '12px',
      bgcolor: `${color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mr: 2,
      color: color
    }}>
      <Icon />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" fontWeight="medium">{title}</Typography>
      <Typography variant="caption" color="text.secondary">{time}</Typography>
    </Box>
    <Typography variant="subtitle2" fontWeight="bold" color={color}>
      {value}
    </Typography>
  </Box>
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for fitness data
  const [stats, setStats] = useState({
    calories: '2,450',
    steps: '12,548',
    heartRate: '128',
    water: '2.5',
  });

  const [activities, setActivities] = useState([
    { id: 1, title: 'Morning Run', time: 'Today, 07:30 AM', value: '5.2 km', icon: RunIcon, color: '#FF6B6B' },
    { id: 2, title: 'Weight Training', time: 'Today, 06:15 AM', value: '45 min', icon: FitnessCenterIcon, color: '#4ECDC4' },
    { id: 3, title: 'Water Intake', time: 'Today, 03:45 PM', value: '1.2 L', icon: WaterIcon, color: '#6C63FF' },
  ]);

  const [workoutPlan, setWorkoutPlan] = useState({
    title: 'Full Body Workout',
    time: '45 min',
    calories: '320',
    exercises: [
      { name: 'Warm Up', time: '5 min' },
      { name: 'Jumping Jacks', time: '1 min' },
      { name: 'Push Ups', time: '3 x 12' },
      { name: 'Squats', time: '3 x 15' },
      { name: 'Plank', time: '1 min' },
    ]
  });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/fitness-stats');
        // const data = await response.json();
        // setStats(data.stats);
        // setActivities(data.activities);
        // setWorkoutPlan(data.workoutPlan);
      } catch (error) {
        console.error('Error fetching fitness data:', error);
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
      pt: { xs: 8, sm: 9 },
      maxWidth: '100%',
      overflowX: 'hidden',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: '"Poppins", sans-serif',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            fontFamily: '"Poppins", sans-serif'
          }}>
            FitTrack
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Welcome back, Alex!
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
          <PersonIcon />
        </Avatar>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Calories Burned" 
            value="2,450" 
            icon={FireIcon} 
            color="#FF6B6B" 
            unit="kcal"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Steps" 
            value="12,548" 
            icon={RunIcon} 
            color="#4ECDC4" 
            unit="steps"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Heart Rate" 
            value="128" 
            icon={HeartIcon} 
            color="#FF9E80" 
            unit="bpm"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Water Intake" 
            value="2.5" 
            icon={WaterIcon} 
            color="#6C63FF" 
            unit="L"
          />
        </Grid>
        <Grid xs={6}>
          <StatCard 
            title="Calories" 
            value="2,450" 
            icon={FireIcon} 
            color="#FF6B6B" 
            unit="kcal"
          />
        </Grid>
        <Grid xs={6}>
          <StatCard 
            title="Steps" 
            value="12,548" 
            icon={RunIcon} 
            color="#4ECDC4" 
            unit="steps"
          />
        </Grid>
        <Grid xs={6}>
          <StatCard 
            title="Heart Rate" 
            value="128" 
            icon={HeartIcon} 
            color="#FF9E80" 
            unit="bpm"
          />
        </Grid>
        <Grid xs={6}>
          <StatCard 
            title="Water" 
            value="2.5" 
            icon={WaterIcon} 
            color="#6C63FF" 
            unit="L"
          />
        </Grid>
      </Grid>

      {/* Workout Plan */}
      <Card sx={{ 
        mb: 3, 
        borderRadius: 3,
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        background: 'white',
        overflow: 'hidden'
      }}>
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" fontWeight="bold">Today's Workout</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Full Body Workout</Typography>
            </Box>
            <Box sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              px: 1.5, 
              py: 0.5, 
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center'
            }}>
              <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="caption">45 min</Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ p: 2 }}>
          {workoutPlan.exercises.map((exercise, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              py: 1.5,
              borderBottom: index !== workoutPlan.exercises.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
            }}>
              <Typography>{exercise.name}</Typography>
              <Typography variant="body2" color="text.secondary">{exercise.time}</Typography>
            </Box>
          ))}
          
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activities
              </Typography>
              {activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  title={activity.title}
                  time={activity.time}
                  value={activity.value}
                  icon={activity.icon}
                  color={activity.color}
                />
              ))}
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
