using System.Collections.Generic;
using System.Threading.Tasks;
using DemoRM.Data.Repository.Interface;
using DemoRM.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoRM.Data.Repository
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(DataContext context) : base(context)
        {}

        public void CreateCustomer(Customer customer)
        {
            Add(customer);
        }

        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await GetAll().ToListAsync();
        }

        public async Task<Customer> GetCustomer(int id)
        {
            return await GetByCondition(x => x.SHOP_ID.Equals(55)).FirstOrDefaultAsync();
        }

        public void RemoveCustomer(Customer customer)
        {
            Remove(customer);
        }

        
    }
}