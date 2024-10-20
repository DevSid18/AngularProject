using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using StoreManagementApi.Connection;
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
        DbConnect dbConnection = new DbConnect();

        [HttpGet]
        [Route("StoreInformation")]
        public void StoreInformation()
        {

        }

        [HttpGet]
        [Route("CustomerDetails")]
        public IActionResult CustomerDetails()
        {
            try
            {
                customers = Customer.CustomerDetails();
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

        [HttpPost]
        [Route("GetUserInfo{custId}")]
        public CustomerModel GetUserInfo(int custId)
        {
            CustomerModel customerInfo = new CustomerModel();
            if (custId > 0)
            {
                customerInfo = Customer.GetUserInfo(custId);
            }
            return customerInfo;
        }
    }
}