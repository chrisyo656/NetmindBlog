namespace NetmindBlog.API.Models;

public class User {
    public long IdUser { get; set; }
    public string Name { get; set; } = "";
    public string LastName { get; set; } = string.Empty;
    public string UserName { get; set; } =  "";
    public byte[] Hash { get; set; } =  Array.Empty<byte>();
    public byte[] Salt { get; set; } =  Array.Empty<byte>();
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    //Relaciones
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}