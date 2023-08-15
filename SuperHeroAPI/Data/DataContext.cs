using Microsoft.EntityFrameworkCore;
using SuperHeroAPI.Models;

namespace SuperHeroAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<SuperHero> SuperHeroes => Set<SuperHero>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // now() from postgresql
            modelBuilder.Entity<SuperHero>()
                .Property(e => e.CreatedAt)
                .HasDefaultValueSql("now()");
            modelBuilder.Entity<SuperHero>()
                .Property(e => e.UpdatedAt)
                .HasDefaultValueSql("now()");
        }
    }
}
