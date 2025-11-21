import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
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
  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value="128"
            icon={AssignmentIcon}
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value="84"
            icon={CheckCircleIcon}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Team Members"
            value="12"
            icon={GroupIcon}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Productivity"
            value="87%"
            icon={TrendingUpIcon}
            color="#e91e63"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Task Overview
            </Typography>
            <Box height={300}>
              {/* Placeholder for chart */}
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f9f9f9',
                  borderRadius: 2,
                }}
              >
                <Typography color="textSecondary">Task completion chart will be displayed here</Typography>
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recent Activities
            </Typography>
            <Box>
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={{ display: 'flex', mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#e3f2fd',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <AssignmentIcon color="primary" fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      Task {item} completed
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {item * 2} hours ago
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
