
namespace FestivalLineupAPI.Models;

public class Festival
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Slug { get; private set; } = default!;
    public string Name { get; private set; } = default!;
    public DateOnly StartDate { get; private set; }
    public DateOnly EndDate { get; private set; }
    public string Location { get; private set; } = default!;

    public List<Performance> Performances { get; private set; } = new();

    private Festival() { }

    public Festival(string slug, string name, DateOnly startDate, DateOnly endDate, string location)
    {
        Slug = slug;
        Name = name;
        StartDate = startDate;
        EndDate = endDate;
        Location = location;
    }

    public Performance AddPerformance(string performerName, string stageName, DateTimeOffset start, DateTimeOffset? end)
    {
        var performance = new Performance(Id, performerName, stageName, start, end);
        Performances.Add(performance);
        return performance;
    }
}