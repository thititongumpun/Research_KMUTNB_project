using CustomerNoSQLs.Models;
using DemoRM.Data.Repository.Interface;
using DemoRM.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CustomerApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;
        private readonly ICustomerDatabaseSettings _settings;

        public CustomerController(CustomerService customerService,ICustomerDatabaseSettings settings)
        {
            _customerService = customerService;
            _settings = settings;
        }

        [HttpGet(Name = "GetCustomers")]
        public async Task<ActionResult<List<CustomerNoSQL>>> Get() =>
            await _customerService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCustomer")]
        public async Task<ActionResult<CustomerNoSQL>> Get(string id)
        {
            var customer = await _customerService.Get(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        [HttpGet("{SHOP_ID}", Name = "GetShop")]
        public async Task<ActionResult<CustomerNoSQL>> GetShop(string id)
        {
            var customer = await _customerService.GetShop(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        [HttpPost]
        public ActionResult<CustomerNoSQL> Create(CustomerNoSQL customer)
        {
            _customerService.Create(customer);
            
            return CreatedAtRoute("GetCustomers", new { CUS_ID = customer.CUS_ID,
                                    SHOP_ID = customer.SHOP_ID, Active_Time_Log = customer.Active_Time_Log, ProductType = customer.ProductType, Phone = customer.Phone}, customer);
        }


        
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var customer = await _customerService.Get(id);

            if (customer == null)
            {
                return NotFound();
            }

            _customerService.Remove(customer.Id);

            return Ok(customer);
        }

        [HttpDelete("{SHOP_ID}")]
        public async Task<IActionResult> DeletePhone(string id)
        {
            var customer = await _customerService.GetShop(id);

            if (customer == null)
            {
                return NotFound();
            }

            _customerService.RemoveShop(customer.SHOP_ID);

            return Ok(customer);
        }

        [HttpPost("drop")]
        public IActionResult DropMongoDB()
        {
            var client = new MongoClient(_settings.ConnectionString);
            var db = client.GetDatabase(_settings.DatabaseName);

            db.DropCollection("Customers");
            return Ok();
        }
    }
}