
using System.ComponentModel.DataAnnotations;

namespace EventfulDemo.Web.Models
{
    public class SearchViewModel
    {
        [Required]
        public string Location { get; set; }
    }
}