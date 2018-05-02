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

            var currentUser = Context.Users.FirstOrDefault(x => x.UserName == model.Username);

            currentUser.TotalHours = (int)(model.End - model.Start).TotalHours;

            var result = await Context.SaveChangesAsync();

            return Ok(result);
        }

        // POST: /api/Time/GetTracks
        [HttpGet]
        [Route("api/Time/GetTracks")]
        public async Task<IHttpActionResult> GetTracks(string userId)
        {
            var userStore = new UserStore<ApplicationUser>(Context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var retval = await userManager.GetRolesAsync(userId);

            foreach (string role in retval)
            {
                await userManager.RemoveFromRolesAsync(userId, role);
            }

            var timeTracks = Context.Users.Select(x => x.TimeTrackingData).ToList();

            return Ok(timeTracks);
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
