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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/tasks');
        // const data = await response.json();
        // setTasks(data);
        
        // For now, set empty array
        setTasks([]);
      } catch (err) {
        setError('Failed to load tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/tasks', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     text: newTask,
      //     completed: false,
      //     priority: 'medium',
      //     dueDate: new Date().toISOString().split('T')[0],
      //   })
      // });
      // const newTaskData = await response.json();
      // setTasks([...tasks, newTaskData]);
      
      // For now, just clear the input
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleTask = async (taskId) => {
    try {
      // TODO: Replace with actual API call
      // const taskToUpdate = tasks.find(t => t.id === taskId);
      // const response = await fetch(`/api/tasks/${taskId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ completed: !taskToUpdate.completed })
      // });
      // const updatedTask = await response.json();
      // setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      
      // For now, just update local state
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      // setTasks(tasks.filter(task => task.id !== taskId));
      
      // For now, just update local state
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    } finally {
      setAnchorEl(null);
    }
  };

  const toggleImportant = async (taskId) => {
    try {
      // TODO: Replace with actual API call
      // const taskToUpdate = tasks.find(t => t.id === taskId);
      // const newPriority = taskToUpdate.priority === 'high' ? 'medium' : 'high';
      // const response = await fetch(`/api/tasks/${taskId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ priority: newPriority })
      // });
      // const updatedTask = await response.json();
      // setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      
      // For now, just update local state
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, priority: task.priority === 'high' ? 'medium' : 'high' } 
          : task
      ));
    } catch (err) {
      console.error('Error updating task priority:', err);
    }
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
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ p: 2, color: 'error.main' }}>
              <Typography>{error}</Typography>
            </Box>
          ) : filteredTasks.length > 0 ? (
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
                  <IconButton 
                    edge="end" 
                    onClick={(e) => handleMenuClick(e, task)}
                  >
                    <MoreVertIcon />
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
