using ContactMaster;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagement.Controllers
{
    public class CMSController : Controller
    {

        readonly IContactMaster _contactMaster;  
        public CMSController(IContactMaster contact)
        {
            this._contactMaster = contact;
        }

        public IActionResult DashBoard() => View();
        public IActionResult CMS() => View();

        [HttpPost]
        public async Task<IActionResult> CmsContent(CMS cms)
        {
            ContactMaster.CMS data = await _contactMaster.MergeAction(cms);
            return Content("Success");
        }
    }
}
