using System.Collections.Generic;
using System.Threading.Tasks;
using DemoRM.Models;

namespace DemoRM.Data.Repository.Interface
{
    public interface ICustomerRepository
    {
        void CreateCustomer(Customer token);
        Task<IEnumerable<Customer>> GetCustomers();
        Task<Customer> GetCustomer(string cusName);
        public void RemoveCustomer(Customer customer);
        void Save();
    }
}
