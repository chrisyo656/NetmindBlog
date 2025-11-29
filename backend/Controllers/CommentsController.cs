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
public class CommentsController : ControllerBase
{
    private readonly DataDbContext _context;

    public CommentsController(DataDbContext context)
    {
        _context = context;
    }

    // GET: api/comments/post/5 (comentarios de un post)
    [HttpGet("post/{postId}")]
    public async Task<ActionResult<List<CommentDTO>>> GetCommentsByPost(long postId)
    {
        var comments = await _context.Comments
            .Include(c => c.User)
            .Where(c => c.IdPost == postId)
            .OrderByDescending(c => c.CommentedAt)
            .Select(c => new CommentDTO
            {
                IdComment = c.IdComment,
                Content = c.Content,
                CommentedAt = c.CommentedAt,
                AuthorUserName = c.User.UserName,
                AuthorFullName = $"{c.User.Name} {c.User.LastName}"
            })
            .ToListAsync();

        return Ok(comments);
    }

    // POST: api/comments (crear comentario, requiere autenticación)
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<CommentDTO>> CreateComment(CreateCommentDTO dto)
    {
        var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // Verificar que el post existe
        var postExists = await _context.Posts.AnyAsync(p => p.IdPost == dto.IdPost);
        if (!postExists)
        {
            return NotFound(new { message = "Post no encontrado" });
        }

        var comment = new Comment
        {
            IdPost = dto.IdPost,
            IdUser = userId,
            Content = dto.Content,
            CommentedAt = DateTime.UtcNow
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        // Cargar el usuario para la respuesta
        await _context.Entry(comment).Reference(c => c.User).LoadAsync();

        var response = new CommentDTO
        {
            IdComment = comment.IdComment,
            Content = comment.Content,
            CommentedAt = comment.CommentedAt,
            AuthorUserName = comment.User.UserName,
            AuthorFullName = $"{comment.User.Name} {comment.User.LastName}"
        };

        return Ok(response);
    }

    // DELETE: api/comments/5 (eliminar comentario, solo el autor)
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComment(long id)
    {
        var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var comment = await _context.Comments.FindAsync(id);

        if (comment == null)
        {
            return NotFound(new { message = "Comentario no encontrado" });
        }

        if (comment.IdUser != userId)
        {
            return Forbid();
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}