using ContactMaster;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagement.Controllers
{
    public class CMSController : Controller
    {
        readonly CMS cms;
        readonly ContactMaster.ContactMaster cMSMaster; 
        public CMSController(CMS cMS, ContactMaster.ContactMaster cMSMaster)
        {
            this.cms = cMS;
            this.cMSMaster = cMSMaster; 
        }

        public IActionResult DashBoard() => View();
        public IActionResult CMS() => View();
        public async Task<IActionResult> CmsContent()
        {
            
            return Content("Success");
        }
    }
}
