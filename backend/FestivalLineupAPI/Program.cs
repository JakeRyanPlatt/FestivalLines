/* .NET target framework for the code: net8.0

This is a simple .NET 8 minimal API that serves mock data for a festival schedule.
It defines a single GET endpoint that returns a list of festival events in JSON format.
The ScheduleRow interface defines the structure of each festival event.
Includes properties for Id, Name, Location, Day, Stage, and Time.

 */




// vite dev server: http[:]//localhost[:]5173
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();
app.UseCors();

// Hard-coded mock data endpoint
/*
 Festival/Performance tables will look like this:
 */

var festivals = new[]
{
    new FestivalDto("dabb-lounge", "Dabb Lounge", "2026-06-20", "2026-06-22", "Atelier Bruckner, Stuttgart"),
};

var lineup = new[]
{
    new PerformanceDto("Massive Attack", "The Monolith (Main)", "Full Weekend"),
    new PerformanceDto("Nine Inch Nails", "The Monolith (Main)", "Full Weekend"),
    new PerformanceDto("Björk", "The Monolith (Main)", "Full Weekend"),
    new PerformanceDto("Peggy Gou", "The Monolith (Main)", "Friday Jun 20"),
    new PerformanceDto("Four Tet", "The Resonance Dome", "Saturday Jun 21"),

};

app.MapGet("/api/festivals", () => festivals);

app.MapGet("/api/festivals/{slug}/lineup", (string slug) =>
    slug == "dabb-lounge" ? Results.Ok(lineup) : Results.NotFound());

app.Run();

record FestivalDto(string Slug, string Name, string StartDate, string EndDate, string Location);
record PerformanceDto(string Name, string Stage, string Day);

