using Microsoft.EntityFrameworkCore;
using NetmindBlog.API.Models;

namespace NetmindBlog.API.Data;

public class DataDbContext : DbContext
{
    public DataDbContext(DbContextOptions<DataDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.IdUser);
            entity.Property(u => u.Name).HasMaxLength(100).IsRequired();
            entity.Property(u => u.LastName).HasMaxLength(100).IsRequired();
            entity.Property(u => u.UserName).HasMaxLength(50).IsRequired();
            entity.HasIndex(u => u.UserName).IsUnique();
            entity.Property(u => u.Hash).HasMaxLength(64).IsRequired();
            entity.Property(u => u.Salt).HasMaxLength(32).IsRequired();
        });

        // Post
        modelBuilder.Entity<Post>(entity =>
        {
            entity.ToTable("Post");
            entity.HasKey(p => p.IdPost);
            entity.Property(p => p.Title).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Content).IsRequired();
            entity.Property(p => p.ImageMimeType).HasMaxLength(50);

            entity.HasOne(p => p.User)
                  .WithMany(u => u.Posts)
                  .HasForeignKey(p => p.IdUser)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Comment
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.IdComment);
            entity.Property(e => e.Content).IsRequired();

            entity.HasOne(e => e.Post)
                  .WithMany(p => p.Comments)
                  .HasForeignKey(e => e.IdPost)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.User)
                  .WithMany(u => u.Comments)
                  .HasForeignKey(e => e.IdUser)
                  .OnDelete(DeleteBehavior.NoAction);
        });
    }
}
