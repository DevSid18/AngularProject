namespace StoreManagementApi.Entity
{
    public class CustomerModel
    {
        public int customerId { get; set; }
        public string? firstName { get; set; }
        public string? middleName { get; set; }
        public string? lastName { get; set; }
        public string? email { get; set; }
        public string? contact { get; set; }
        public string? phyAddress { get; set; }
        public string? action {get;set;}
    }
}