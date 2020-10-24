using DemoRM.Data.Repository.Interface;

namespace DemoRM.Data.Repository
{
    public class CustomerDatabaseSettings : ICustomerDatabaseSettings
    {
        public string CustomersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}