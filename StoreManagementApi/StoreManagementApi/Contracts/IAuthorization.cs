using StoreManagementApi.Entity;

namespace StoreManagementApi.Contracts
{
    public interface IAuthorization
    {
        public Task<string?> CheckAuthorization(LoginModel loginInfo);
        // public Task<string?> GenerateSysPassword();
    }
}
