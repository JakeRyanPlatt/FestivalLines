var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Hard-coded mock data endpoint
app.MapGet("/api/festivals", () =>
{
    var mockFestivals = new[]
    {
        var mockFestivals = new[]
        {
            new { Id = 1, Name = "Monolith", Location = "Stage1", Day = "Friday", Time = "1600-1800"},
            new { Id = 2, Name = "Bunker", Location = "Stage2", Day = "Saturday", Time = "1830 - 2030"},
            new { Id = 3, Name = "Dome", Location = "Stage3", Day = "Sunday", Time = "2100 - 2230"}
        };
            return Results.Ok(mockFestivals);
    });
    
app.Run();
