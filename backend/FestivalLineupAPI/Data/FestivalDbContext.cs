
using FestivalLineupAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FestivalLineupAPI.Data;

public class FestivalDbContext : DbContext
{
    public FestivalDbContext(DbContextOptions<FestivalDbContext> options) : base(options) { }
    public DbSet<Festival> Festivals => Set<Festival>();
    public DbSet<Performance> Performances => Set<Performance>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       modelBuilder.Entity<Festival>(entity =>
       {
           entity.HasIndex(f => f.Slug).IsUnique();
           entity.HasMany(f => f.Performances)
            .WithOne()
            .HasForeignKey(p => p.FestivalId)
            .OnDelete(DeleteBehavior.Cascade);
       });
       modelBuilder.Entity<Performance>(entity =>
       {
           entity.HasIndex(p => p.StageName);
       });
      
    }
}