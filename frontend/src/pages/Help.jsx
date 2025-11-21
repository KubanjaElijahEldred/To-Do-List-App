import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const Help = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Help & Support
        </Typography>
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            How do I create a new task?
          </Typography>
          <Typography variant="body1" paragraph>
            To create a new task, click on the "+ New Task" button in the Tasks section and fill in the required details.
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
            How can I assign tasks to team members?
          </Typography>
          <Typography variant="body1" paragraph>
            Navigate to the Team page to view and manage team members. You can assign tasks from the task creation or editing interface.
          </Typography>
          
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
            Where can I find my completed tasks?
          </Typography>
          <Typography variant="body1">
            All completed tasks can be found in the Reports section under the "Completed Tasks" tab.
          </Typography>
        </Box>
        
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Contact Support
        </Typography>
        <Typography variant="body1" paragraph>
          If you need further assistance, please contact our support team at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: support@todolistapp.com
          <br />
          Phone: +1 (555) 123-4567
          <br />
          Hours: Monday - Friday, 9:00 AM - 6:00 PM EST
        </Typography>
      </Paper>
    </Container>
  );
};

export default Help;
