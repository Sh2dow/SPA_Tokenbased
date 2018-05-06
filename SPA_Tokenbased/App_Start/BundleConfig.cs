using System.Web.Optimization;

namespace WebAPI_NG_TokenbasedAuth
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jq/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                        "~/Scripts/ng/angular.min.js",
                        "~/Scripts/ng/angular-resource.min.js",
                        "~/Scripts/ng/angular-animate.min.js",
                        "~/Scripts/ng/angular-aria.min.js",
                        "~/Scripts/ng/angular-cookies.min.js",
                        "~/Scripts/ng/angular-loader.min.js",
                        "~/Scripts/ng/angular-message-format.min.js",
                        "~/Scripts/ng/angular-messages.min.js",
                        "~/Scripts/ng/angular-parse-ext.min.js",
                        "~/Scripts/ng/angular-route.min.js",
                        "~/Scripts/ng/angular-sanitize.min.js",
                        "~/Scripts/ng/angular-touch.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/angular/plugins").Include(
                        "~/Scripts/mg/package/angular-ui/router.min.js",
                        "~/Scripts/mg/package/angular-ui/router-extras.min.js",
                        "~/Scripts/mg/package/angular-ui/bootstrap.min.js",
                        "~/Scripts/mg/package/angular-ui/bootstrap-templates.min.js",
                        //"~/Scripts/mg/package/angular-ui/grid.min.js",
                        //"~/Scripts/mg/package/angular-ui/uploader.min.js",
                        "~/Scripts/mg/package/angular-ui/validate.min.js",
                        "~/Scripts/mg/package/modules/ngStorage/ngStorage.min.js",
                        //"~/Scripts/mg/package/modules/contextMenu/contextMenu.min.js",
                        "~/Scripts/moment/moment.min.js",
                        "~/Scripts/moment/moment-with-locales.min.js",
                        "~/Scripts/moment/angular-moment.min.js"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap/bootstrap.min.js",
                        "~/Scripts/respond/respond.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                        "~/Content/bootstrap.css",
                        "~/Content/font-awesome.min.css",
                        "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/datatables/css").Include(
                        "~/Content/Datatables/css/dataTables.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/datatables").Include(
                        //"~/Scripts/jq/jquery-3.3.1.min.js",
                        "~/Scripts/Datatables/dataTables.min.js",
                        "~/Scripts/Datatables/dataTables.select.min.js",
                        "~/Scripts/app/dataTable.js"));
        }
    }
}
