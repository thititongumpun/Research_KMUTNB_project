using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DemoRM.Data;
// using AutoMapper;
using DemoRM.Data.Repository.Interface;
using DemoRM.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace pmk_api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        // private readonly IMapper _mapper;

        public CustomersController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpPost]
        public IActionResult CreateCustomer([FromBody] Customer customer)
        {
            _customerRepository.CreateCustomer(customer);
            _customerRepository.Save();

            return Ok(customer);
        }

        [HttpGet]
        public async Task<IActionResult> GetTokens()
        {
            var customer = await _customerRepository.GetCustomers();
            return Ok(customer);
        }

        [HttpGet("{SHOP_ID}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _customerRepository.GetCustomer(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpDelete("{SHOP_ID}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _customerRepository.GetCustomer(id);
            if (customer == null)
            {
                return NotFound();
            }

            _customerRepository.RemoveCustomer(customer);
            _customerRepository.Save();
            return Ok(customer);
        }

        [HttpPost("drop")]
        public IActionResult DeleteTable()
        {
            string connectionString = "Server=localhost;Database=DemoRM;Trusted_Connection=True;";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                string sql = $"Delete From tbl_customer";
                using (SqlCommand cmd = new SqlCommand(sql, connection))
                {
                    connection.Open();
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }
            }
            return Ok();
        }
    }
}
