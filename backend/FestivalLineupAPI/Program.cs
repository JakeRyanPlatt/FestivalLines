using FestivalLineupAPI.Data;
using FestivalLineupAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddDbContext<FestivalDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("Default")
            ?? throw new InvalidOperationException("Connection string 'Default' was not found. Check dotnet user-secrets list."),
        npgsql => npgsql
            .EnableRetryOnFailure()
            .MaxBatchSize(1)));
var app = builder.Build();
app.UseCors("AllowAll");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<FestivalDbContext>();
    db.Database.Migrate();

    if (!db.Festivals.Any())
    {
        var festival = new Festival(
            "dabb-lounge",
            "Dabb Lounge",
            new DateOnly(2026, 6, 20),
            new DateOnly(2026, 6, 22),
            "Atelier Brucker, Stuttgart");

        var cest = TimeSpan.FromHours(2);
        DateTimeOffset T(int day, int hour, int minute) => new DateTimeOffset(2026, 6, day, hour, minute, 0, cest).ToUniversalTime();
        festival.AddPerformance("Valeska", "The Monolith (Main)", T(20, 16, 0), T(20, 18, 0));
        festival.AddPerformance("Durante", "The Canyon", T(20, 16, 0), T(20, 18, 0));
        festival.AddPerformance("Joplyn", "The Resonance Dome", T(20, 16, 0), T(20, 18, 0));
        festival.AddPerformance("Peggy Gou", "The Monolith (Main)", T(20, 18, 30), T(20, 20, 30));
        festival.AddPerformance("Elkka", "The Canyon", T(20, 18, 30), T(20, 20, 30));
        festival.AddPerformance("Tsha", "The Resonance Dome", T(20, 18, 30), T(20, 20, 30));
        festival.AddPerformance("Justice", "The Monolith (Main)", T(20, 21, 0), T(20, 22, 30));
        festival.AddPerformance("Bicep (Chroma)", "The Canyon", T(20, 21, 0), T(20, 22, 30));
        festival.AddPerformance("Parra for Cuva", "The Resonance Dome", T(20, 21, 0), T(20, 22, 30));
        festival.AddPerformance("Rüfüs Du Sol", "The Monolith (Main)", T(20, 23, 0), T(21, 1, 0));
        festival.AddPerformance("Jamie xx", "The Canyon", T(20, 23, 0), T(21, 1, 0));
        festival.AddPerformance("Four Tet", "The Resonance Dome", T(20, 23, 0), T(21, 1, 0));
        festival.AddPerformance("Late Night Jam", "The Monolith (Main)", T(21, 1, 30), null);
        festival.AddPerformance("Skin on Skin", "The Canyon", T(21, 1, 30), null);
        festival.AddPerformance("Monolink (DJ)", "The Resonance Dome", T(21, 1, 30), null);

        db.Festivals.Add(festival);
        db.SaveChanges();
    }
}

app.MapGet("/api/debug/connection", async (FestivalDbContext db) =>
{
    var canConnect = await db.Database.CanConnectAsync();
    if (!canConnect)
    {
        return Results.Problem("Could not connect to the database.");
    }

    return Results.Ok(new
    {
        connected = true,
        festivalCount = await db.Festivals.CountAsync(),
        performanceCount = await db.Performances.CountAsync()
    });
});

app.MapGet("/api/festivals", async (FestivalDbContext db) =>
    await db.Festivals
        .OrderBy(f => f.StartDate)
        .Select(f => new FestivalDto(f.Slug, f.Name, f.StartDate, f.EndDate, f.Location))
        .ToListAsync());

app.MapGet("/api/festivals/{slug}/lineup", async (string slug, FestivalDbContext db) =>
{
    var festival = await db.Festivals
        .Include(f => f.Performances)
        .FirstOrDefaultAsync(f => f.Slug == slug);

    return festival is null
        ? Results.NotFound()
        : Results.Ok(festival.Performances
            .OrderBy(p => p.StartTime)
            .Select(p => new PerformanceDto(p.PerformerName, p.StageName, p.StartTime, p.EndTime)));
});

app.Run();

record FestivalDto(string Slug, string Name, DateOnly StartDate, DateOnly EndDate, string Location);
record PerformanceDto(string PerformerName, string StageName, DateTimeOffset StartTime, DateTimeOffset? EndTime);