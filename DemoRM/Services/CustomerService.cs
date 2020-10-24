using System.Collections.Generic;
using System.Threading.Tasks;
using CustomerNoSQLs.Models;
using DemoRM.Data.Repository.Interface;
using MongoDB.Driver;

namespace DemoRM.Services
{
    public class CustomerService
    {
        private readonly IMongoCollection<CustomerNoSQL> _customers;
        public CustomerService(ICustomerDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);


            _customers = db.GetCollection<CustomerNoSQL>(settings.CustomersCollectionName);
        }


        public async Task<List<CustomerNoSQL>> Get() 
        {
            return await _customers.Find(customer => true).ToListAsync();
        } 

        public async Task<CustomerNoSQL> Get(string id) 
        {
            return await _customers.Find<CustomerNoSQL>(customer => customer.Id == id).FirstOrDefaultAsync();
        }

        public async Task<CustomerNoSQL> GetShop(string id) 
        {
            return await _customers.Find<CustomerNoSQL>(customer => customer.SHOP_ID == 55).FirstOrDefaultAsync();
        }

        public CustomerNoSQL Create(CustomerNoSQL customer)
        {
            _customers.InsertOne(customer);
            
            return customer;
        }

        public void Update(string id, CustomerNoSQL customerIn)
        {
            _customers.ReplaceOne(book => book.Id ==id, customerIn);
        }

        public void Remove(CustomerNoSQL customerIn)
        {
            _customers.DeleteOne(customer => customer.Id == customerIn.Id);
        }

        public void Remove(string id)
        {
            _customers.DeleteOne(customer => customer.Id == id);
        }

        public void RemoveShop(int id)
        {
            _customers.DeleteOne(customer => customer.SHOP_ID == id);
        }

        
        
    }
}