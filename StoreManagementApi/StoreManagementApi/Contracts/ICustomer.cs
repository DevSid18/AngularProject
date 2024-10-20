using StoreManagementApi.Entity;

namespace StoreManagementApi.Contracts
{
    public interface ICustomer
    {
        List<CustomerModel> CustomerDetails();
        string AddCustomer(CustomerModel customer);
        CustomerModel GetUserInfo(int custId);
    }
}