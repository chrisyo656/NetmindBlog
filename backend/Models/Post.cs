namespace NetmindBlog.API.Models;

public class Post {
    public long IdPost { get; set; }
    public long IdUser { get; set; }
    public string Title { get; set; } = "";
    public string Content { get; set; } = "";
    public byte[]? BannerImage { get; set; }
    public string? ImageMimeType { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }

    //Relaciones
    public User User { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}