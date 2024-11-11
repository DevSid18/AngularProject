using System;

namespace StoreManagementApi.Entity
{
    public class CustomerModel
    {
        public int customerId { get; set; }
        public string? firstName { get; set; }
        public string? middleName { get; set; }
        public string? lastName { get; set; }
        public string? country { get; set; }
        public string? state { get; set; }
        public string? district { get; set; }
        public string? phyAddress { get; set; }
        public string? email { get; set; }
        public string? contact { get; set; }
        public string? gender { get; set; }
        public string? password { get; set; }
        public string? confirmPassword { get; set; }
        public bool isActive { get; set; }
        public string? action { get; set; }
        public string? result { get; set; }

    }
}