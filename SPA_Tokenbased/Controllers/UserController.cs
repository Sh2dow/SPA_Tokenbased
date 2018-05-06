using System.Web.Mvc;

namespace WebAPI_NG_TokenbasedAuth.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Users()
        {
            return PartialView();
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Roles()
        {
            return PartialView();
        }

        public ActionResult Dashboard()
        {
            return PartialView();
        }

        public ActionResult TimeTracking()
        {
            return PartialView();
        }
    }
}