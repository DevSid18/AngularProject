namespace StoreManagementApi.Contracts
{
    public interface IAuthorization
    {
        public Task<string?> GenerateSysPassword();
    }
}
