using System.Web.Mvc;

namespace WebAPI_NG_TokenbasedAuth.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult SecurityInfo()
        {
            return View();
        }
    }
}