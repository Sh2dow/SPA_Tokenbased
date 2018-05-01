using System.Web.Mvc;

namespace WebAPI_NG_TokenbasedAuth.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return PartialView();
        }

        public ActionResult Signup()
        {
            return PartialView();
        }
    }
}