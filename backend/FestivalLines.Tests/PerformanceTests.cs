using Xunit;
using FestivalLineupAPI.Models;
namespace FestivalLines.Tests;

public class PerformanceTests
{
/*
- Confirms creating a Performance actually stores the values passed
- Name, Stage, Times
*/

    [Fact]
    public void Constructor_SetsAllFieldsCorrectly()
    {
        var festivalId = Guid.NewGuid();
        var start = DateTimeOffset.UtcNow;
        var end = start.AddHours(2);

        var performance = new Performance(festivalId, "Peggy Gou", "The Monolith (Main)", start, end);

        Assert.Equal(festivalId, performance.FestivalId);
        Assert.Equal("Peggy Gou", performance.PerformerName);
        Assert.Equal("The Monolith (Main)",performance.StageName);
        Assert.Equal(start, performance.StartTime);
        Assert.Equal(end, performance.EndTime);
    }
/*
- Confirms every performance gets a real unique ID, never a blank one
*/
    [Fact]
    public void Constructor_GeneratesNonEmptyId()
    {
        var performance = new Performance(Guid.NewGuid(), "Four Tet", "The Resonance Dome", DateTimeOffset.UtcNow, null);

        Assert.NotEqual(Guid.Empty, performance.Id);
    }
/*
- Confirms open-ended Performances (no set end time) are allowed
*/
    [Fact]
    public void EndTime_CanBeNull()
    {
        var performance = new Performance(Guid.NewGuid(), "Late Night Jam", "The Monolith (Main)", DateTimeOffset.UtcNow, null);

        Assert.Null(performance.EndTime);
    }
}