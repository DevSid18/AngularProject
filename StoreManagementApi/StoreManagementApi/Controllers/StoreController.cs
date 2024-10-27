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
        [Route("CustomerDetails{custId}")]
        public IActionResult CustomerDetails(int custId)
        {
            try
            {
                customers = Customer.CustomerDetails(custId);
                return Ok(customers);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return Ok(customers);
        }
        [HttpPost]
        [Route("AddCustomer")]
        public IActionResult AddCustomer(CustomerModel customer)
        {            
            string result = string.Empty;
            try
            {
                result = Customer.AddCustomer(customer);
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return Ok(result);
        }
    }
}