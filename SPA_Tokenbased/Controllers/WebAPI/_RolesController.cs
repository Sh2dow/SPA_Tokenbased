//using System.Linq;
//using System.Web.Http;
//using Microsoft.AspNet.Identity;
//using Microsoft.AspNet.Identity.EntityFramework;
//using System.Threading.Tasks;
//using WebAPI_NG_TokenbasedAuth.Models;

//namespace WebAPI_NG_TokenbasedAuth.Controllers.WebAPI
//{
//    public class RolesController : BaseApiController
//    {
//        public IHttpActionResult Get()
//        {
//            var retval = Context.Roles.ToList();

//            return Ok(retval);
//        }

//        public async Task<IHttpActionResult> Post(string name)
//        {
//            var roleStore = new RoleStore<IdentityRole>(Context);
//            var roleManager = new RoleManager<IdentityRole>(roleStore);

//            var result = await roleManager.CreateAsync(new IdentityRole { Name = name });

//            return Ok(result);

//        }

//        public async Task<IHttpActionResult> Delete(string Id)
//        {
//            var roleStore = new RoleStore<IdentityRole>(Context);
//            var roleManager = new RoleManager<IdentityRole>(roleStore);

//            var role = await roleManager.FindByIdAsync(Id);

//            var result = await roleManager.DeleteAsync(role);
//            return Ok(result);
//        }
//    }
//}
