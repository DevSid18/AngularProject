using StoreManagementApi.Entity;

namespace StoreManagementApi.Contracts
{
    public interface ICustomer
    {
        List<CustomerModel> CustomerDetails(int custId);
        string AddCustomer(CustomerModel customer);
    }
}