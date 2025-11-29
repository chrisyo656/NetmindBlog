using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NetmindBlog.API.Data;
using NetmindBlog.API.DTOs;
using NetmindBlog.API.Models;

namespace NetmindBlog.API.Services;

public class AuthService : IAuthService
{
    private readonly DataDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(DataDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<(AuthResponseDTO Response, string Token)?> Register(RegisterDTO dto)
    {
        // Verificar si el usuario ya existe
        if (await _context.Users.AnyAsync(u => u.UserName == dto.UserName))
        {
            return null;
        }

        // Crear hash y salt con BCrypt
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        var hashBytes = Encoding.UTF8.GetBytes(passwordHash);

        var user = new User
        {
            Name = dto.Name,
            LastName = dto.LastName,
            UserName = dto.UserName,
            Hash = hashBytes,
            Salt = Array.Empty<byte>(), // BCrypt incluye el salt en el hash
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var response = MapUserResponse(user);

        var token = GenerateJwtToken(user);

        return (response, token);
    }

    public async Task<(AuthResponseDTO Response, string Token)?> Login(LoginDTO dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == dto.UserName);

        if (user == null)
        {
            return null;
        }

        // Verificar contraseña
        var storedHash = Encoding.UTF8.GetString(user.Hash);
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, storedHash))
        {
            return null;
        }

        var response = MapUserResponse(user);

        var token = GenerateJwtToken(user);

        return (response, token);
    }

    public async Task<AuthResponseDTO?> GetCurrentUserAsync(long userId)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.IdUser == userId);

        return user == null ? null : MapUserResponse(user);
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["SecretKey"]!;
        var issuer = jwtSettings["Issuer"];
        var audience = jwtSettings["Audience"];
        var expirationMinutes = int.Parse(jwtSettings["ExpirationInMinutes"]!);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.IdUser.ToString()),
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim("FullName", $"{user.Name} {user.LastName}")
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static AuthResponseDTO MapUserResponse(User user) => new()
    {
        IdUser = user.IdUser,
        UserName = user.UserName,
        FullName = $"{user.Name} {user.LastName}"
    };
}
