import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Chip,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Today as TodayIcon,
  StarBorder as StarBorderIcon,
  Star as StarIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
}));

const PriorityChip = ({ priority }) => {
  const priorityMap = {
    high: { label: 'High', color: 'error' },
    medium: { label: 'Medium', color: 'warning' },
    low: { label: 'Low', color: 'primary' },
  };

  const { label, color } = priorityMap[priority] || { label: 'Low', color: 'default' };
  return <Chip label={label} color={color} size="small" variant="outlined" />;
};

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, priority: 'high', dueDate: '2023-12-15' },
    { id: 2, text: 'Review code changes', completed: true, priority: 'medium', dueDate: '2023-12-10' },
    { id: 3, text: 'Team meeting', completed: false, priority: 'high', dueDate: '2023-12-12' },
    { id: 4, text: 'Update documentation', completed: false, priority: 'low', dueDate: '2023-12-20' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setAnchorEl(null);
  };

  const toggleImportant = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            priority: task.priority === 'high' ? 'medium' : 'high' 
          } 
        : task
    ));
  };

  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (tabValue === 1) return !task.completed;
    if (tabValue === 2) return task.completed;
    return true;
  });

  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Tasks
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => document.getElementById('taskInput')?.focus()}
        >
          Add Task
        </Button>
      </Box>

      <StyledPaper>
        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <TextField
            id="taskInput"
            fullWidth
            variant="outlined"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            InputProps={{
              startAdornment: <AddIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add Task
          </Button>
        </form>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            aria-label="task tabs"
          >
            <Tab label="All Tasks" />
            <Tab label="Active" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Button 
            size="small" 
            startIcon={<FilterListIcon />}
            sx={{ textTransform: 'none' }}
          >
            Filter
          </Button>
          <Button 
            size="small" 
            startIcon={<SortIcon />}
            sx={{ textTransform: 'none' }}
          >
            Sort
          </Button>
        </Box>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem 
                  sx={{ 
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: task.completed ? 'action.hover' : 'background.paper',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      onClick={(e) => handleMenuClick(e, task)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => toggleTask(task.id)}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'text.secondary' : 'text.primary',
                          }}
                        >
                          {task.text}
                        </Typography>
                        <PriorityChip priority={task.priority} />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <TodayIcon fontSize="small" color="action" sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption" color="textSecondary">
                          Due {task.dueDate}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton 
                    onClick={() => toggleImportant(task.id)}
                    sx={{ ml: 1 }}
                  >
                    {task.priority === 'high' ? (
                      <StarIcon color="warning" />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="textSecondary">
                {tabValue === 0 
                  ? 'No tasks yet. Add one above!' 
                  : tabValue === 1 
                    ? 'No active tasks' 
                    : 'No completed tasks'}
              </Typography>
            </Box>
          )}
        </List>
      </StyledPaper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          if (selectedTask) toggleImportant(selectedTask.id);
          handleMenuClose();
        }}>
          {selectedTask?.priority === 'high' ? 'Mark as Normal' : 'Mark as Important'}
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedTask) toggleTask(selectedTask.id);
          handleMenuClose();
        }}>
          {selectedTask?.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedTask) deleteTask(selectedTask.id);
        }} sx={{ color: 'error.main' }}>
          Delete Task
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Tasks;
