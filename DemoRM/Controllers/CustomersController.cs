using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
// using AutoMapper;
using DemoRM.Data.Repository.Interface;
using DemoRM.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{CUS_NAME}")]
        public async Task<IActionResult> GetCustomer(string CUS_NAME)
        {
            var customer = await _customerRepository.GetCustomer(CUS_NAME);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpDelete("{CUS_NAME}")]
        public async Task<IActionResult> DeleteCustomer(string CUS_NAME)
        {
            var customer = await _customerRepository.GetCustomer(CUS_NAME);
            if (customer == null)
            {
                return NotFound();
            }

            _customerRepository.RemoveCustomer(customer);
            _customerRepository.Save();
            return Ok(customer);
        }
    }
}
