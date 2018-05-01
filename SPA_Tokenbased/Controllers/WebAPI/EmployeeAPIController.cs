using System.Collections.Generic;
using System.Web.Http;
using WebAPI_NG_TokenbasedAuth.Models;

namespace WebAPI_NG_TokenbasedAuth.Controllers.WebAPI
{
    [Authorize]
    public class EmployeeAPIController : ApiController
    {
        public List<Employee> Get()
        {
            return new EmployeeDatabase();
        }
    }
}
