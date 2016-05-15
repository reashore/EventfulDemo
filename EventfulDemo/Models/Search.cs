
using System.ComponentModel.DataAnnotations;

namespace EventfulDemo.Models
{
    public class SearchViewModel
    {
        [Required]
        public string Location { get; set; }
    }
}