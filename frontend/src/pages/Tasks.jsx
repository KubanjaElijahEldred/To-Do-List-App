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
  IconButton,
  Paper,
  Tabs,
  Tab,
  Chip,
  Divider,
  Menu,
  MenuItem,
  CircularProgress,
  Grid,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Today as TodayIcon,
  StarBorder as StarBorderIcon,
  Star as StarIcon,
  Search as SearchIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/common/PageHeader';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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
  // State for UI
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Task state
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Complete project proposal', 
      completed: false, 
      important: true, 
      priority: 'high',
      dueDate: '2023-11-25'
    },
    { 
      id: 2, 
      title: 'Review pull requests', 
      completed: true, 
      important: false, 
      priority: 'medium',
      dueDate: '2023-11-20'
    },
    { 
      id: 3, 
      title: 'Update documentation', 
      completed: false, 
      important: true, 
      priority: 'low',
      dueDate: '2023-11-30'
    },
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'active') return !task.completed;
    if (activeTab === 'completed') return task.completed;
    if (activeTab === 'important') return task.important;
    return true; // 'all' tab
  });
  
  // Filter by search query
  const searchedTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const newTaskItem = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      important: false,
      priority: 'medium',
      dueDate: null,
      createdAt: new Date().toISOString()
    };
    
    setTasks([newTaskItem, ...tasks]);
    setNewTask('');
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Toggle task importance and priority
  const toggleImportant = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { 
          ...task, 
          important: !task.important,
          priority: task.priority === 'high' ? 'medium' : 'high'
        };
      }
      return task;
    }));
  };
  
  // Handle menu actions
  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    handleMenuClose();
  };
  
  // Count tasks by status
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    important: tasks.filter(t => t.important).length
  };

  return (
    <PageLayout>
      <PageHeader 
        title="My Tasks" 
        subtitle={taskCounts.active > 0 ? `${taskCounts.active} tasks remaining` : 'All caught up!'}
        actions={
          <>
            <Tooltip title="Refresh">
              <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={viewMode === 'list' ? 'Grid View' : 'List View'}>
              <IconButton 
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                sx={{ mr: 1 }}
              >
                {viewMode === 'list' ? <ViewModuleIcon /> : <ViewListIcon />}
              </IconButton>
            </Tooltip>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => document.getElementById('new-task-input')?.focus()}
            >
              Add Task
            </Button>
          </>
        }
      />

      {/* Search and filter */}
      <Box sx={{ mb: 3 }}>
        <form onSubmit={handleAddTask}>
          <TextField
            id="new-task-input"
            fullWidth
            variant="outlined"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="task filters"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 100,
                textTransform: 'none',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>All</span>
                  {taskCounts.all > 0 && (
                    <Chip 
                      label={taskCounts.all} 
                      size="small" 
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="all" 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Active</span>
                  {taskCounts.active > 0 && (
                    <Chip 
                      label={taskCounts.active} 
                      size="small" 
                      color="primary"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="active" 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Completed</span>
                  {taskCounts.completed > 0 && (
                    <Chip 
                      label={taskCounts.completed} 
                      size="small" 
                      color="success"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="completed" 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon fontSize="small" sx={{ mr: 0.5, color: 'warning.main' }} />
                  <span>Important</span>
                  {taskCounts.important > 0 && (
                    <Chip 
                      label={taskCounts.important} 
                      size="small" 
                      color="warning"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="important" 
            />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {searchedTasks.length} {searchedTasks.length === 1 ? 'task' : 'tasks'} found
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              size="small" 
              startIcon={<FilterListIcon />}
              sx={{ textTransform: 'none' }}
              disabled={loading}
            >
              Filter
            </Button>
            <Button 
              size="small" 
              startIcon={<SortIcon />}
              sx={{ textTransform: 'none' }}
              disabled={loading}
            >
              Sort
            </Button>
          </Box>
        </Box>

        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ p: 2, color: 'error.main', textAlign: 'center' }}>
              <Typography>{error}</Typography>
            </Box>
          ) : searchedTasks.length === 0 ? (
            <Box textAlign="center" p={4}>
              <Typography variant="subtitle1" color="textSecondary">
                No tasks found. {activeTab !== 'all' && 'Try changing the filter.'}
              </Typography>
            </Box>
          ) : (
            searchedTasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="more"
                      onClick={(e) => handleMenuClick(e, task)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  sx={{
                    '&:hover': { bgcolor: 'action.hover' },
                    textDecoration: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.7 : 1
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<CheckCircleIcon color="primary" />}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: task.completed ? 'line-through' : 'none',
                          color: task.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {task.dueDate && (
                          <Chip
                            icon={<TodayIcon fontSize="small" />}
                            label={new Date(task.dueDate).toLocaleDateString()}
                            size="small"
                            variant="outlined"
                            sx={{ mr: 1 }}
                          />
                        )}
                        <PriorityChip priority={task.priority} />
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      ) : (
        <Grid container spacing={2}>
          {searchedTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
              <StyledPaper>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1} gap={1}>
                      {task.dueDate && (
                        <Chip
                          icon={<TodayIcon fontSize="small" />}
                          label={new Date(task.dueDate).toLocaleDateString()}
                          size="small"
                          variant="outlined"
                        />
                      )}
                      <PriorityChip priority={task.priority} />
                    </Box>
                  </Box>
                  <IconButton 
                    size="small"
                    onClick={(e) => handleMenuClick(e, task)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon color="primary" />}
                  />
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleImportant(task.id)}
                      color={task.important ? 'warning' : 'default'}
                    >
                      {task.important ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Task menu */}
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
    </PageLayout>
  );
};

export default Tasks;
