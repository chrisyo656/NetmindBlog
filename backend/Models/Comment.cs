namespace NetmindBlog.API.Models;

public class Comment {
    public long IdComments { get; set; }
    public long IdPost { get; set; }
    public long IdUser { get; set; }
    public string Content { get; set; } = "";
    public DateTime CommentedAt { get; set; } = DateTime.Now;

    //Relaciones
    public Post Post { get; set; } = null!;
    public User User { get; set; } = null!;

}