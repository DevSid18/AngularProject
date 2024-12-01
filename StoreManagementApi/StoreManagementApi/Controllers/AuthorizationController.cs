using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoreManagementApi.Contracts;
using StoreManagementApi.Entity;

namespace StoreManagementApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorization auth;
        public AuthorizationController(IAuthorization _auth)
        {
            auth = _auth;
        }
        [Route("Authentication")]
        [HttpPost]
        public IActionResult Authentication(LoginModel loginInfo)
        {
            string? authResult = auth.CheckAuthorization(loginInfo).Result;
            return Ok(authResult);
        }
    }
}
