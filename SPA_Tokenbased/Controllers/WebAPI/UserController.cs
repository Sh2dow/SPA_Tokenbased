using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebAPI_NG_TokenbasedAuth.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebAPI_NG_TokenbasedAuth.Controllers.WebAPI
{
    public class UserController : ApiController
    {
        private ApplicationDbContext Context = new ApplicationDbContext();

        [HttpGet]
        [Route("api/User/GetAll")]
        //[WebApiAuthorize(Roles = "Admin")]
        public IHttpActionResult GetAllUsers()
        {

            var dataSrc = Context.Users.Select(x => new
            {
                id = x.Id,
                email = x.Email,
                userName = x.UserName,
                fullname = x.Fullname,
                totalHours = x.TotalHours,
                roleName = Context.Roles.FirstOrDefault(r => r.Id == x.Roles.FirstOrDefault().RoleId).Name
            }).ToList();

            return Ok(new
            {
                data = dataSrc,
                recordsTotal = default(int),
                recordsFiltered = dataSrc.Count,
                draw = default(int)
            });
        }

        [HttpDelete]
        [Route("api/User/Delete")]
        public async Task<IHttpActionResult> Delete(string userId)
        {
            var userStore = new UserStore<ApplicationUser>(Context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var user = Context.Users.Find(userId);

            var result = await userManager.DeleteAsync(user);

            return Ok();
        }

        [HttpGet]
        [Route("api/User/GetRoles")]
        public IHttpActionResult GetRoles(string userId)
        {
            var roles = Context.Roles.SelectMany(r => r.Users.Where(u => u.UserId == userId)).ToList();
            return Ok(roles);
        }

        [HttpPost]
        [Route("api/User/AddToRole")]
        public async Task<IHttpActionResult> AddToRole(string userId, [FromBody]List<string> roleIds)
        {
            var userStore = new UserStore<ApplicationUser>(Context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var retval = await userManager.GetRolesAsync(userId);

            foreach(string role in retval)
            {
                await userManager.RemoveFromRolesAsync(userId, role);
            }

            var roles = Context.Roles.Where(x => roleIds.Contains(x.Id)).ToList();

            foreach (var role in roles)
            {
                await userManager.AddToRoleAsync(userId, role.Name);
            }

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                Context.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
