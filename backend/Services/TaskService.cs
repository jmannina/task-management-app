using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Data;
using TaskManagement.API.DTOs;
using TaskManagement.API.Models;

namespace TaskManagement.API.Services;

public interface ITaskService
{
    Task<IEnumerable<TaskResponseDto>> GetAllTasksAsync(string? status = null);
    Task<TaskResponseDto?> GetTaskByIdAsync(int id);
    Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto dto);
    Task<TaskResponseDto?> UpdateTaskAsync(int id, UpdateTaskDto dto);
    Task<bool> DeleteTaskAsync(int id);
}

public class TaskService : ITaskService
{
    private readonly TaskDbContext _context;

    public TaskService(TaskDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskResponseDto>> GetAllTasksAsync(string? status = null)
    {
        var query = _context.Tasks.AsQueryable();

        if (!string.IsNullOrEmpty(status))
        {
            query = status.ToLower() switch
            {
                "completed" => query.Where(t => t.IsCompleted),
                "active" => query.Where(t => !t.IsCompleted),
                _ => query
            };
        }

        var tasks = await query
            .OrderByDescending(t => t.Priority)
            .ThenBy(t => t.DueDate)
            .ToListAsync();

        return tasks.Select(MapToDto).ToList();
    }

    public async Task<TaskResponseDto?> GetTaskByIdAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        return task == null ? null : MapToDto(task);
    }

    public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Title))
            throw new ArgumentException("Title is required");

        var task = new Task
        {
            Title = dto.Title.Trim(),
            Description = dto.Description?.Trim(),
            DueDate = dto.DueDate,
            Priority = (TaskPriority)dto.Priority,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return MapToDto(task);
    }

    public async Task<TaskResponseDto?> UpdateTaskAsync(int id, UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            return null;

        if (!string.IsNullOrWhiteSpace(dto.Title))
            task.Title = dto.Title.Trim();

        if (dto.Description != null)
            task.Description = dto.Description.Trim();

        if (dto.IsCompleted.HasValue)
            task.IsCompleted = dto.IsCompleted.Value;

        if (dto.DueDate != null)
            task.DueDate = dto.DueDate;

        if (dto.Priority.HasValue)
            task.Priority = (TaskPriority)dto.Priority.Value;

        task.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return MapToDto(task);
    }

    public async Task<bool> DeleteTaskAsync(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null)
            return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    private static TaskResponseDto MapToDto(Task task) => new()
    {
        Id = task.Id,
        Title = task.Title,
        Description = task.Description,
        IsCompleted = task.IsCompleted,
        DueDate = task.DueDate,
        Priority = task.Priority.ToString(),
        CreatedAt = task.CreatedAt,
        UpdatedAt = task.UpdatedAt
    };
}
