namespace NetmindBlog.API.DTOs;

// Para crear un post
public class CreatePostDTO
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? BannerImageBase64 { get; set; }
    public string? ImageMimeType { get; set; }
}

// Para mostrar un post
public class PostDTO
{
    public long IdPost { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? BannerImageBase64 { get; set; }
    public DateTime CreatedAt { get; set; }
    public string AuthorUserName { get; set; } = string.Empty;
    public string AuthorFullName { get; set; } = string.Empty;
    public int CommentCount { get; set; }
}