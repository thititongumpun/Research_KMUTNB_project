using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoRM.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        // public int Id { get; set; }
        public int LOG_ID { get; set; }
        public int CUS_ID { get; set; }
        public int SHOP_ID { get; set; }
        public DateTime Active_Time_Log { get; set; }
        public string Product_Type {get;set;}
    }
}