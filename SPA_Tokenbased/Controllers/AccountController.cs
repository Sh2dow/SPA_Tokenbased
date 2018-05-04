using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace WebAPI_NG_TokenbasedAuth.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return PartialView();
        }

        public ActionResult SignupBody()
        {
            return PartialView();
        }

        public ActionResult Signup()
        {
            return PartialView();
        }

        public ActionResult ForgotPassword()
        {
            return PartialView();
        }

        public ActionResult ChangePassword()
        {
            return PartialView();
        }

        public ActionResult ResetPassword()
        {
            return PartialView();
        }

        [ValidateAntiForgeryToken]
        public ActionResult Logout()
        {
            AuthenticationManager.SignOut();
            Session.Abandon();
            return RedirectToAction("Index", "Account");
        }
    }
}