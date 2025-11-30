using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetmindBlog.API.DTOs;
using NetmindBlog.API.Services;

namespace NetmindBlog.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private const string AuthCookieName = "jwt";
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDTO>> Register(RegisterDTO dto)
    {
        var result = await _authService.Register(dto);

        if (result is null)
        {
            return BadRequest(new { message = "El nombre de usuario ya existe" });
        }

        var (response, token) = result.Value;
        AppendAuthCookie(token);
        return Ok(response);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDTO>> Login(LoginDTO dto)
    {
        var result = await _authService.Login(dto);

        if (result is null)
        {
            return Unauthorized(new { message = "Usuario o contraseña incorrectos" });
        }

        var (response, token) = result.Value;
        AppendAuthCookie(token);
        return Ok(response);
    }

    [HttpGet("verify")]
    [Authorize]
    public IActionResult VerifySession()
    {
        return Ok(new { authenticated = true });
    }

    [HttpPost("logout")]
    [Authorize]
    public IActionResult Logout()
    {
        Response.Cookies.Delete(AuthCookieName, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });

        return Ok(new { authenticated = false });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<AuthResponseDTO>> GetCurrentUser()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !long.TryParse(userIdClaim.Value, out var userId))
        {
            return Unauthorized();
        }

        var userInfo = await _authService.GetCurrentUserAsync(userId);
        if (userInfo == null)
        {
            return NotFound();
        }

        return Ok(userInfo);
    }

    private void AppendAuthCookie(string token)
    {
        var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = jwtToken.ValidTo
        };

        Response.Cookies.Append(AuthCookieName, token, cookieOptions);
    }
}
