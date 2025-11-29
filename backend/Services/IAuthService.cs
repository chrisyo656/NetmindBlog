using NetmindBlog.API.DTOs;

namespace NetmindBlog.API.Services;

public interface IAuthService
{
    Task<(AuthResponseDTO Response, string Token)?> Register(RegisterDTO dto);
    Task<(AuthResponseDTO Response, string Token)?> Login(LoginDTO dto);
    Task<AuthResponseDTO?> GetCurrentUserAsync(long userId);
}
