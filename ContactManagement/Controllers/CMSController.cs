using ContactMaster;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagement.Controllers
{
    public class CMSController : Controller
    {
        public IActionResult DashBoard()
        {
            return View();
        }
        public IActionResult CMS()
        {
            return View();
        }

    }
}
