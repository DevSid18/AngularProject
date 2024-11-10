using Microsoft.AspNetCore.Mvc;
using StoreManagementApi.Contracts;
using StoreManagementApi.Entity;

namespace StoreManagementApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoreController : ControllerBase
    {
        private readonly ICustomer Customer;
        public StoreController(ICustomer _Customer)
        {
            Customer = _Customer;
        }
        List<CustomerModel> customers = new List<CustomerModel>();
        [HttpPost]
        [Route("CustomerActions")]
        public IActionResult CustomerActions(CustomerModel customer)
        {
            try
            {
                string? result = Customer.CustomerActions(customer);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Ok(customers);
        }
    }
}