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

            var hours = (int)(model.End - model.Start).TotalHours;
            currentUser.TotalHours += hours;

            currentUser.TimeTrackingData.Add(new TimeTrackingData
            {
                Date = model.End.Date,
                Hours = (byte)hours
            });

            var result = await Context.SaveChangesAsync();

            return Ok(result);
        }

        // POST: /api/Time/GetTracks
        [HttpGet]
        [Route("api/Time/GetTracks")]
        public async Task<IHttpActionResult> GetTracks(string userId)
        {
            var timeTracks = Context.Users.AsQueryable().Where(x => x.Id == userId).SelectMany(t => t.TimeTrackingData).ToList();

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
