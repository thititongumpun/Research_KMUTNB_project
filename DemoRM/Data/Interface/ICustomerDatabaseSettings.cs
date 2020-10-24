namespace DemoRM.Data.Repository.Interface
{
    public interface ICustomerDatabaseSettings
    {
        string CustomersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}