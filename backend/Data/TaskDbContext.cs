using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Models;

namespace TaskManagement.API.Data;

public class TaskDbContext : DbContext
{
    public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
    {
    }

    public DbSet<Task> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Task>()
            .HasKey(t => t.Id);

        modelBuilder.Entity<Task>()
            .Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(255);

        modelBuilder.Entity<Task>()
            .Property(t => t.Description)
            .HasMaxLength(2000);

        modelBuilder.Entity<Task>()
            .Property(t => t.Priority)
            .HasConversion<int>();
    }
}
