namespace NetmindBlog.API.DTOs;

// Para crear un comentario
public class CreateCommentDTO
{
    public long IdPost { get; set; }
    public string Content { get; set; } = string.Empty;
}

// Para mostrar un comentario
public class CommentDTO
{
    public long IdComment { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CommentedAt { get; set; }
    public string AuthorUserName { get; set; } = string.Empty;
    public string AuthorFullName { get; set; } = string.Empty;
}