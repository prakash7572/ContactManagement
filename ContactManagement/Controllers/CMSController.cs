using ContactMaster;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
        public async Task<IActionResult> CmsContact([FromBody] CMS cms) 
        {
            Response<CMS> data = await _contactMaster.MergeAction(cms); 
            return Content(JsonConvert.SerializeObject(data));
        }
        [HttpGet]
        public async Task<IActionResult> Fetch(int ID=0)
        {
            var data = await _contactMaster.Fetch(ID);
            return Content(JsonConvert.SerializeObject(data));
        }
    }
}
