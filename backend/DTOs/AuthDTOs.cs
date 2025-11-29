namespace NetmindBlog.API.DTOs;

// Para registrarse
public class RegisterDTO
{
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

// Para login
public class LoginDTO
{
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

// Respuesta después de login exitoso
public class AuthResponseDTO
{
    public long IdUser { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
}
