namespace StoreManagementApi.Entity
{
    public class LoginModel
    {
        public string? username { get; set; }
        public string? password { get; set; }
        public string? confPass { get; set; }
        public string? action { get; set; }
    }
}