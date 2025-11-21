package com.todoapp.backend.repository;

import com.todoapp.backend.model.Task;
import com.todoapp.backend.model.Task.TaskStatus;
import com.todoapp.backend.model.Task.TaskPriority;
import com.todoapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    List<Task> findByUser(User user);
    
    List<Task> findByUserAndStatus(User user, TaskStatus status);
    
    List<Task> findByUserAndPriority(User user, TaskPriority priority);
    
    List<Task> findByUserAndDueDateBefore(User user, LocalDateTime date);
    
    List<Task> findByStatus(TaskStatus status);
    
    void deleteByUser(User user);
}
