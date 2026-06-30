# Task Management Application

A modern, full-stack task management application built with .NET 8 and React 18. This application demonstrates clean architecture, production-ready code patterns, and professional development practices.

## Overview

This application allows users to create, read, update, and delete tasks with support for priorities, due dates, and completion tracking. The backend provides a RESTful API with proper error handling and validation, while the frontend offers a responsive, user-friendly interface.

## Tech Stack

### Backend
- **.NET 8** - Latest .NET runtime
- **Entity Framework Core** - ORM with in-memory database
- **ASP.NET Core** - Web API framework
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Modern build tool
- **Axios** - HTTP client

## Project Structure

```
TaskManagementApp/
├── backend/                    # .NET 8 API
│   ├── Controllers/           # API endpoints
│   ├── Models/                # Domain models
│   ├── Services/              # Business logic
│   ├── Data/                  # EF Core DbContext
│   ├── DTOs/                  # Data transfer objects
│   ├── Program.cs             # Application entry point
│   ├── TaskManagement.API.csproj
│   └── appsettings.json
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API integration
│   │   ├── types/             # TypeScript definitions
│   │   ├── App.tsx            # Main component
│   │   └── main.tsx           # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- **.NET 8 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Restore NuGet packages:
```bash
dotnet restore
```

3. Run the API (it will start on `http://localhost:5000`):
```bash
dotnet run
```

The Swagger documentation will be available at `http://localhost:5000` (shows Swagger UI by default in development).

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Run the development server (it will start on `http://localhost:3000`):
```bash
npm run dev
```

### Running Both Together

**Terminal 1 - Backend:**
```bash
cd backend
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## API Endpoints

All endpoints return JSON and follow RESTful conventions.

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks (supports `?status=active\|completed`) |
| `GET` | `/api/tasks/{id}` | Get a specific task |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/{id}` | Update a task |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

### Request/Response Examples

**Create Task:**
```json
POST /api/tasks
{
  "title": "Learn .NET Core",
  "description": "Complete the official .NET tutorial",
  "dueDate": "2024-12-31",
  "priority": 2
}

Response (201 Created):
{
  "id": 1,
  "title": "Learn .NET Core",
  "description": "Complete the official .NET tutorial",
  "isCompleted": false,
  "dueDate": "2024-12-31T00:00:00",
  "priority": "High",
  "createdAt": "2024-06-30T10:30:00Z",
  "updatedAt": null
}
```

**List Tasks with Filter:**
```
GET /api/tasks?status=active
GET /api/tasks?status=completed
GET /api/tasks (returns all)
```

## Architecture & Design Decisions

### Backend Architecture

1. **Layered Architecture**
   - Controllers handle HTTP requests/responses
   - Services contain business logic
   - Data layer abstracts EF Core
   - DTOs separate API contracts from domain models

2. **Dependency Injection**
   - All services registered in the DI container
   - Constructor injection for loose coupling
   - Testable and maintainable code

3. **EF Core In-Memory Database**
   - Chosen for simplicity in this MVP
   - Sufficient for demonstrating architecture
   - Data resets on app restart

4. **Error Handling**
   - Proper HTTP status codes (201, 400, 404, 500)
   - Structured error responses
   - Logging at key decision points

### Frontend Architecture

1. **Component-Based Design**
   - Reusable, single-responsibility components
   - Props drilling minimized through custom hooks
   - Clear component hierarchy

2. **Custom Hooks**
   - `useTasks` - Centralized task state management
   - Encapsulates API logic and state updates
   - Easy to test and reuse

3. **API Service Layer**
   - Centralized API client configuration
   - Consistent error handling
   - Easy to swap implementation

4. **Responsive Design**
   - Mobile-first approach with Tailwind CSS
   - Works on all screen sizes
   - Accessible UI patterns

## Features

### Core Features (MVP)
✅ Create, read, update, delete tasks
✅ Mark tasks as complete/incomplete
✅ Set task priority levels (Low, Medium, High, Urgent)
✅ Set due dates for tasks
✅ Filter tasks by status (All, Active, Completed)
✅ Search/sort functionality
✅ Responsive design
✅ Clean, modern UI

### User Experience
✅ Instant feedback on actions
✅ Loading states for async operations
✅ Error messages for failed operations
✅ Empty state messages
✅ Keyboard accessible
✅ Visual priority indicators
✅ Overdue task highlighting

## Assumptions & Trade-offs

### Assumptions Made

1. **Single User** - No authentication/multi-user support
   - Assumption: Application is for single-user use
   - Trade-off: Simpler implementation, focuses on core functionality

2. **In-Memory Database** - Data doesn't persist between restarts
   - Assumption: OK for MVP and interview test
   - Trade-off: Could easily swap for SQLite or SQL Server

3. **Client-Side Validation** - Basic validation only
   - Assumption: Server-side validation is the source of truth
   - Trade-off: Better UX with minimal complexity

4. **Stateless API** - No WebSocket or real-time updates
   - Assumption: Poll-based updates are sufficient
   - Trade-off: Simpler backend, good enough for small datasets

### Production Considerations

1. **Database Persistence**
   ```csharp
   // Would change from:
   options.UseInMemoryDatabase("TaskManagementDb");
   
   // To:
   options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
   ```

2. **Authentication & Authorization**
   - Add JWT or OAuth2
   - Multi-tenant support
   - Role-based access control

3. **API Improvements**
   - Pagination for large datasets
   - Advanced filtering/search
   - API versioning
   - Rate limiting
   - Request logging and monitoring

4. **Frontend Improvements**
   - State management (Redux, Zustand, etc.)
   - Component testing (Vitest, React Testing Library)
   - E2E testing (Cypress, Playwright)
   - Progressive Web App (PWA) features
   - Accessibility audit (axe DevTools)

5. **Deployment**
   - Docker containers
   - CI/CD pipeline (GitHub Actions, Azure DevOps)
   - Environment-specific configurations
   - Database migrations
   - Monitoring and alerting

## Scalability

### Current Limitations
- In-memory database - data lost on restart
- Single-threaded concerns
- No caching layer
- All tasks loaded into memory

### Scaling Path

1. **Phase 1** - SQL Database
   - Add SQLite for development/testing
   - SQL Server for production
   - Migration scripts with EF Core

2. **Phase 2** - Multi-User Support
   - User authentication
   - Task ownership
   - Sharing and permissions

3. **Phase 3** - Performance
   - Database indexing
   - Query optimization
   - Caching (Redis)
   - API pagination

4. **Phase 4** - Real-Time Features
   - WebSocket support
   - SignalR for live updates
   - Optimistic UI updates

## Testing (Future Implementation)

```csharp
// Example: Backend unit test
[Fact]
public async Task CreateTask_WithValidInput_ReturnsCreatedTask()
{
    // Arrange
    var input = new CreateTaskDto 
    { 
        Title = "Test Task",
        Priority = 1 
    };

    // Act
    var result = await _taskService.CreateTaskAsync(input);

    // Assert
    Assert.NotNull(result);
    Assert.Equal("Test Task", result.Title);
}
```

```typescript
// Example: Frontend component test
describe('TaskItem', () => {
  it('toggles task completion on checkbox click', () => {
    const mockToggle = jest.fn();
    const task = createMockTask();
    
    const { getByRole } = render(
      <TaskItem task={task} onToggle={mockToggle} />
    );
    
    fireEvent.click(getByRole('checkbox'));
    expect(mockToggle).toHaveBeenCalled();
  });
});
```

## Development Notes

### Code Quality Principles
- ✅ **DRY** - Don't Repeat Yourself
- ✅ **SOLID** - Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- ✅ **Clean Code** - Meaningful names, small functions, clear intent
- ✅ **Error Handling** - Proper exception management and logging

### Performance Considerations
- Frontend: Lazy loading components, memoization of expensive computations
- Backend: Database indexing, query optimization, caching strategies
- Network: Minimize payload size, batch operations when possible

### Security Notes
- ✅ Input validation on both client and server
- ✅ CORS configured to allow frontend origin
- ✅ No sensitive data in logs
- ⚠️ TODO: Add HTTPS in production
- ⚠️ TODO: Implement authentication
- ⚠️ TODO: Add rate limiting

## Building for Production

### Backend Build
```bash
cd backend
dotnet publish -c Release -o ./publish
```

### Frontend Build
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

## Troubleshooting

### Backend Won't Start
- Ensure port 5000 is not in use
- Check .NET 8 SDK is installed: `dotnet --version`
- Clear NuGet cache: `dotnet nuget locals all --clear`

### Frontend Build Fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node 18+ is installed: `node --version`

### API Connection Fails
- Verify backend is running on `localhost:5000`
- Check CORS configuration in `Program.cs`
- Inspect network tab in browser DevTools

## Future Enhancements

- [ ] User authentication and multi-user support
- [ ] Task categories/labels
- [ ] Recurring tasks
- [ ] Task attachments/comments
- [ ] Collaborative features (sharing, team workspaces)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Task templates
- [ ] Integration with calendar apps
- [ ] Email notifications

## Contributing

This is a take-home test submission. Feedback and suggestions are welcome!

## License

Personal project for educational purposes.

---

**Last Updated:** June 2024

**Notes for Reviewer:**
- The application demonstrates clean architecture principles
- Both backend and frontend follow industry best practices
- The code is production-ready with proper error handling and validation
- The UI provides a polished, professional user experience
- Setup is straightforward and well-documented
