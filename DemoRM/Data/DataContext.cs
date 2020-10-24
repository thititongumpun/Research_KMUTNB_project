using DemoRM.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoRM.Data
{
    public class DataContext : DbContext
    {
         public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Customer> tbl_customer { get; set; }
    }
}