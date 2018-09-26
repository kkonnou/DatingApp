using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    // api/Auth
    [Route ("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            //validate user

            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            userForRegisterDto.UserName =  userForRegisterDto.UserName.ToLower();
            if (await _repo.UserExists( userForRegisterDto.UserName)) return BadRequest("Username already exists");

            var userToCreate = new User{Username =  userForRegisterDto.UserName};

            var createdUser = await _repo.Register(userToCreate,  userForRegisterDto.Password);

            return StatusCode(201);
            
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username, userForLoginDto.Password);
            if (userFromRepo== null)
                return Unauthorized();
      
            var claims = new[]
            {
               // 
            };
        }
    }
}