using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebAPI_NG_TokenbasedAuth.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebAPI_NG_TokenbasedAuth.Controllers.WebAPI
{
    public class TimeController : ApiController
    {
        private ApplicationDbContext Context = new ApplicationDbContext();

        [HttpPost]
        [Route("api/Time/SubmitTime")]
        public async Task<IHttpActionResult> SubmitTime([FromBody]TimeTrackingModel model)
        {
            var userStore = new UserStore<ApplicationUser>(Context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var usr = User.Identity.GetUserId();
            var currentUser = Context.Users.FirstOrDefault(x => x.Id == usr);

            currentUser.TotalHours = (int)(model.End - model.Start).TotalHours;

            var result = await Context.SaveChangesAsync();

            return Ok(result);
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
