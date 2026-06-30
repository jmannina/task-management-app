using Microsoft.AspNetCore.Mvc;
using TaskManagement.API.DTOs;
using TaskManagement.API.Services;

namespace TaskManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ILogger<TasksController> _logger;

    public TasksController(ITaskService taskService, ILogger<TasksController> logger)
    {
        _taskService = taskService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetTasks([FromQuery] string? status = null)
    {
        _logger.LogInformation("Fetching tasks with status filter: {Status}", status ?? "none");
        var tasks = await _taskService.GetAllTasksAsync(status);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponseDto>> GetTask(int id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        if (task == null)
        {
            _logger.LogWarning("Task with id {TaskId} not found", id);
            return NotFound(new { message = "Task not found" });
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> CreateTask([FromBody] CreateTaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = await _taskService.CreateTaskAsync(dto);
            _logger.LogInformation("Task created with id {TaskId}", task.Id);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning("Invalid task creation request: {Message}", ex.Message);
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskResponseDto>> UpdateTask(int id, [FromBody] UpdateTaskDto dto)
    {
        try
        {
            var task = await _taskService.UpdateTaskAsync(id, dto);
            if (task == null)
            {
                _logger.LogWarning("Task with id {TaskId} not found for update", id);
                return NotFound(new { message = "Task not found" });
            }

            _logger.LogInformation("Task {TaskId} updated", id);
            return Ok(task);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning("Invalid task update request: {Message}", ex.Message);
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(int id)
    {
        var deleted = await _taskService.DeleteTaskAsync(id);
        if (!deleted)
        {
            _logger.LogWarning("Task with id {TaskId} not found for deletion", id);
            return NotFound(new { message = "Task not found" });
        }

        _logger.LogInformation("Task {TaskId} deleted", id);
        return NoContent();
    }
}
