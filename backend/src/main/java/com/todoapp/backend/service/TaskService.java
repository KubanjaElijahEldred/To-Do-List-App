package com.todoapp.backend.service;

import com.todoapp.backend.model.Task;
import com.todoapp.backend.model.User;
import com.todoapp.backend.repository.TaskRepository;
import com.todoapp.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<Task> getUserTasks(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUser(user);
    }

    public Task createTask(String title, String description, Task.TaskPriority priority, 
                          String dueDate, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority != null ? priority : Task.TaskPriority.MEDIUM);
        
        if (dueDate != null && !dueDate.isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            task.setDueDate(LocalDateTime.parse(dueDate, formatter));
        }
        
        task.setUser(user);
        
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, TaskController.TaskRequest request, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isEmpty()) {
            throw new RuntimeException("Task not found");
        }

        Task task = taskOpt.get();
        
        // Verify task belongs to user
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        
        if (request.getDueDate() != null && !request.getDueDate().isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            task.setDueDate(LocalDateTime.parse(request.getDueDate(), formatter));
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long id, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isEmpty()) {
            throw new RuntimeException("Task not found");
        }

        Task task = taskOpt.get();
        
        // Verify task belongs to user
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);
    }

    public Task updateTaskStatus(Long id, Task.TaskStatus status, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isEmpty()) {
            throw new RuntimeException("Task not found");
        }

        Task task = taskOpt.get();
        
        // Verify task belongs to user
        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        task.setStatus(status);
        return taskRepository.save(task);
    }
}
