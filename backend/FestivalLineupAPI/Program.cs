/* .NET target framework for the code: net8.0

- This is a simple .NET 10  API that data for a festival schedule.
- It defines a  GET endpoint that returns a list of festival events in JSON format.
- The ScheduleRow interface defines the structure of each festival event.
- Includes properties for Id, Name, Location, Day, Stage, and Time.
## Packages 
    - Npsql.EntityFrameworkCore.PostgreSQL
    - Microsoft.EntityFrameworkCore.Design
 */
// vite dev server: http[:]//localhost[:]5173
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();
app.UseCors();
var cest = TimeSpan.FromHours(2); // Central European Summer Time (UTC+02:00)
// T() Local function is there so entries don't turn into a wall of repeated new DateTimeOffset(...) calls
DateTimeOffset T(int day, int hour, int minute) => new DateTimeOffset(2026, 6, day, hour, minute, 0, cest);


//  Entites
public class Festival
{
    public int Id { get; set; }
    public string Slug { get; set; }
    public string Name { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public string Location { get; set; }
    
    public List<>Performance> Performances {
        get;
        set;
    } = []
}

public class Performance
{
    public int Id { get; set; }
    public int FestivalId
}


app.MapGet("/api/festivals", () => festivals);

app.MapGet("/api/festivals/{slug}/lineup", (string slug) =>
    slug == "dabb-lounge" ? Results.Ok(lineup) : Results.NotFound());

app.Run();

record FestivalDto(string Slug, string Name, string StartDate, string EndDate, string Location);
record PerformanceDto(string PerformerName, string StageName, DateTimeOffset StartTime, DateTimeOffset? EndTime);

