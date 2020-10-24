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

        // public Customer GetOneCustomer(int id)
        // {
        //     return GetByCondition(x => x.CUS_ID == id).SingleOrDefault();
        // }

        public async Task<Customer> GetCustomer(string cusName)
        {
            return await GetByCondition(x => x.CUS_NAME.Equals(cusName)).FirstOrDefaultAsync();
        }

        public void RemoveCustomer(Customer customer)
        {
            Remove(customer);
        }
    }
}