using System.Web.Mvc;

namespace WebAPI_NG_TokenbasedAuth.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }
    }
}