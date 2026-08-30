
namespace FestivalLineupAPI.Models;

public class Performance
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid FestivalId { get; private set; }
    public string PerformerName { get; private set; } = default!;
    public string StageName { get; private set; } = default!;
    public DateTimeOffset StartTime { get; private set; }
    public DateTimeOffset? EndTime { get; private set; }

/*
- Both parameterless constructor and the real constructor are not public (Private and internal)
- Encapsulation forces nothing outside the FestivalLineupAPI assembly can construct a Performance
- Properties are immutable from the outside with {get; private set}, prevents mutating performance after creation
*/

    private Performance() { }

    internal Performance(Guid festivalId, string performerName, string stageName, DateTimeOffset start, DateTimeOffset? end)
    {
        FestivalId = festivalId;
        PerformerName = performerName;
        StageName = stageName;
        StartTime = start;
        EndTime = end;
    }
}