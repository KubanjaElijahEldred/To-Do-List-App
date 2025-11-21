import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import TeamMembers from './TeamMembers';
import TeamRoles from './TeamRoles';

const Team = () => {
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || 'members';

  const handleTabChange = (event, newValue) => {
    // Navigation is handled by the Link components in the Tab components
  };

  return (
    <Box sx={{ p: 3, pt: 8 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange}
          aria-label="team tabs"
        >
          <Tab 
            label="Team Members" 
            value="members" 
            component={Box}
            to="/team/members"
            sx={{ textTransform: 'none', minWidth: 0, mr: 2 }}
          />
          <Tab 
            label="Roles & Permissions" 
            value="roles" 
            component={Box}
            to="/team/roles"
            sx={{ textTransform: 'none', minWidth: 0 }}
          />
        </Tabs>
      </Box>

      <Routes>
        <Route path="members" element={<TeamMembers />} />
        <Route path="roles" element={<TeamRoles />} />
        <Route path="*" element={<Navigate to="members" replace />} />
      </Routes>
    </Box>
  );
};

export default Team;
