using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using WebAPI_NG_TokenbasedAuth.Models;
using WebAPI_NG_TokenbasedAuth.Results;
using System.Linq;

namespace WebAPI_NG_TokenbasedAuth.Controllers.WebAPI
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class BaseApiController : ApiController
    {
        protected internal ApplicationDbContext Context = new ApplicationDbContext();

        protected internal ApplicationUserManager _userManager;
        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

    }
}
