using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetmindBlog.API.Data;
using NetmindBlog.API.DTOs;
using NetmindBlog.API.Models;

namespace NetmindBlog.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly DataDbContext _context;

    public PostsController(DataDbContext context)
    {
        _context = context;
    }

    // GET: api/posts (todos los posts, públicos)
    [HttpGet]
    public async Task<ActionResult<List<PostDTO>>> GetPosts()
    {
        var posts = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Comments)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new PostDTO
            {
                IdPost = p.IdPost,
                Title = p.Title,
                Content = p.Content,
                BannerImageBase64 = p.BannerImage != null ? Convert.ToBase64String(p.BannerImage) : null,
                CreatedAt = p.CreatedAt,
                AuthorUserName = p.User.UserName,
                AuthorFullName = $"{p.User.Name} {p.User.LastName}",
                CommentCount = p.Comments.Count
            })
            .ToListAsync();

        return Ok(posts);
    }

    // GET: api/posts/5 (un post específico)
    [HttpGet("{id}")]
    public async Task<ActionResult<PostDTO>> GetPost(long id)
    {
        var post = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Comments)
            .FirstOrDefaultAsync(p => p.IdPost == id);

        if (post == null)
        {
            return NotFound(new { message = "Post no encontrado" });
        }

        var dto = new PostDTO
        {
            IdPost = post.IdPost,
            Title = post.Title,
            Content = post.Content,
            BannerImageBase64 = post.BannerImage != null ? Convert.ToBase64String(post.BannerImage) : null,
            CreatedAt = post.CreatedAt,
            AuthorUserName = post.User.UserName,
            AuthorFullName = $"{post.User.Name} {post.User.LastName}",
            CommentCount = post.Comments.Count
        };

        return Ok(dto);
    }

    // POST: api/posts (crear post, requiere autenticación)
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<PostDTO>> CreatePost(CreatePostDTO dto)
    {
        var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var post = new Post
        {
            IdUser = userId,
            Title = dto.Title,
            Content = dto.Content,
            BannerImage = dto.BannerImageBase64 != null ? Convert.FromBase64String(dto.BannerImageBase64) : null,
            ImageMimeType = dto.ImageMimeType,
            CreatedAt = DateTime.UtcNow
        };

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        // Cargar el usuario para la respuesta
        await _context.Entry(post).Reference(p => p.User).LoadAsync();

        var response = new PostDTO
        {
            IdPost = post.IdPost,
            Title = post.Title,
            Content = post.Content,
            BannerImageBase64 = dto.BannerImageBase64,
            CreatedAt = post.CreatedAt,
            AuthorUserName = post.User.UserName,
            AuthorFullName = $"{post.User.Name} {post.User.LastName}",
            CommentCount = 0
        };

        return CreatedAtAction(nameof(GetPost), new { id = post.IdPost }, response);
    }

    // DELETE: api/posts/5 (eliminar post, solo el autor)
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(long id)
    {
        var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var post = await _context.Posts.FindAsync(id);

        if (post == null)
        {
            return NotFound(new { message = "Post no encontrado" });
        }

        if (post.IdUser != userId)
        {
            return Forbid();
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}