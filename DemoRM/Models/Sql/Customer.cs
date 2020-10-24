using System.ComponentModel.DataAnnotations;

namespace DemoRM.Models
{   
    public class Customer
    {
        [Key]
        public int CUS_ID { get; set; }
        public string CUS_NAME { get; set; }
        public string GENDER { get; set; }
        public string ADDRESS { get; set; }
        public string PHONE { get; set; }
        public string Email { get; set; }
    }
}