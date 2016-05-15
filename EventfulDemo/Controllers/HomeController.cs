
using System.Web.Mvc;
using EventfulDemo.Web.Models;

namespace EventfulDemo.Web.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            SearchViewModel searchViewModel = new SearchViewModel();
            return View(searchViewModel);
        }
    }
}