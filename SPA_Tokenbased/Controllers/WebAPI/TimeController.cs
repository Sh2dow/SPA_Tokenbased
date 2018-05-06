using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebAPI_NG_TokenbasedAuth.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace WebAPI_NG_TokenbasedAuth.Controllers.WebAPI
{
    public class TimeController : BaseApiController
    {
        [HttpPost]
        [Route("api/Time/SubmitTime")]
        public async Task<IHttpActionResult> SubmitTime([FromBody]TimeTrackingModel model)
        {
            var userStore = new UserStore<ApplicationUser>(Context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var currentUser = Context.Users.FirstOrDefault(x => x.UserName == model.Username);

            var hours = (int)(model.End - model.Start).TotalHours;
            currentUser.TotalHours += hours;

            currentUser.TimeTracks.Add(new TimeTrack
            {
                Date = model.End,
                Hours = (byte)hours
            });

            var result = await Context.SaveChangesAsync();

            return Ok(result);
        }

        // POST: /api/Time/GetTracks
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("api/Time/GetTracks")]
        public IHttpActionResult GetTracks(string userId)
        {
            var timeTracks = Context.Users.AsQueryable().Where(x => x.Id == userId).SelectMany(t => t.TimeTracks).ToList();

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
