using System.Data;
using System.Data.SqlClient;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using StoreManagementApi.Connection;
using StoreManagementApi.Contracts;
using StoreManagementApi.Entity;


namespace StoreManagementApi.Implimentations
{
    public class CustomerImplimentation : ICustomer
    {
        List<CustomerModel> customers = new List<CustomerModel>();
        DbConnect dbConnection = new DbConnect();
        CustomerModel userInfo = new CustomerModel();

        public List<CustomerModel> CustomerDetails()
        {
            SqlConnection sqlCon = dbConnection.Connect();
            string? query = "select*from customertable WHERE isActive = 1";
            SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCmd);
            DataTable dataTable = new DataTable();
            sqlDataAdapter.Fill(dataTable);

            foreach (DataRow dataRow in dataTable.Rows)
            {
                customers.Add(new CustomerModel()
                {
                    customerId = Convert.ToInt32(dataRow["customerId"]),
                    firstName = dataRow["firstName"].ToString(),
                    middleName = dataRow["middleName"].ToString(),
                    lastName = dataRow["lastName"].ToString(),
                    email = dataRow["email"].ToString(),
                    contact = dataRow["contact"].ToString(),
                    phyAddress = dataRow["phyAddress"].ToString(),
                });
            }
            sqlCon.Close();
            return customers;
        }
        public string AddCustomer(CustomerModel customer)
        {
            string result = string.Empty;
            try
            {
                string query = string.Empty;
                SqlConnection sqlCon = dbConnection.Connect();
                switch (customer?.action?.ToLower())
                {
                    case "register":
                        query = "INSERT INTO CustomerTable (firstName, middleName, lastName, email, contact, phyAddress,createdDate,isActive) "
                                            + "VALUES (@firstName, @middleName, @lastName, @email, @contact, @phyAddress, @createdDate,@isActive)";
                        break;
                    case "edit":
                        query = $@"UPDATE  CustomerTable  
                               SET firstName = @firstName, middleName= @middleName, lastName = @lastName, email=@email,isActive=@isActive,
                               contact=@contact,phyAddress=@phyAddress,updatedDate=@updatedDate
                               WHERE customerId = @customerId";
                        break;
                    case "delete":
                        query = "UPDATE CustomerTable SET isActive = 0 WHERE customerId =" + customer.customerId;
                        break;
                }
                using (SqlCommand sqlCmd = new SqlCommand(query, sqlCon))
                {
                    sqlCmd.Parameters.AddWithValue("@customerId", customer?.customerId);
                    sqlCmd.Parameters.AddWithValue("@firstName", customer?.firstName);
                    sqlCmd.Parameters.AddWithValue("@middleName", customer?.middleName);
                    sqlCmd.Parameters.AddWithValue("@lastName", customer?.lastName);
                    sqlCmd.Parameters.AddWithValue("@email", customer?.email);
                    sqlCmd.Parameters.AddWithValue("@contact", customer?.contact);
                    sqlCmd.Parameters.AddWithValue("@phyAddress", customer?.phyAddress);
                    if (customer?.customerId == 0)
                        sqlCmd.Parameters.AddWithValue("@createdDate", DateTime.Now);
                    else
                        sqlCmd.Parameters.AddWithValue("@updatedDate", DateTime.Now);
                    sqlCmd.Parameters.AddWithValue("@isActive", 1);

                    int i = sqlCmd.ExecuteNonQuery();
                    sqlCon.Close();
                    if (customer?.customerId == 0)
                        result = "success";
                    else
                        result = "success";
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return JsonConvert.SerializeObject(result);
        }
        public CustomerModel GetUserInfo(int custId)
        {
            try
            {
                DataTable dataTable = new DataTable();
                SqlConnection sqlCon = dbConnection.Connect();
                string? query = "SELECT*FROM customertable WHERE customerId=" + custId;
                SqlCommand sqlCmd = new SqlCommand(query, sqlCon);
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCmd);
                sqlDataAdapter.Fill(dataTable);
                CustomerModel customerInfo = new CustomerModel()
                {
                    customerId = Convert.ToInt32(dataTable.Rows[0]["customerId"]),
                    firstName = dataTable.Rows[0]["firstName"].ToString(),
                    middleName = dataTable.Rows[0]["middleName"].ToString(),
                    lastName = dataTable.Rows[0]["lastName"].ToString(),
                    email = dataTable.Rows[0]["email"].ToString(),
                    contact = dataTable.Rows[0]["contact"].ToString(),
                    phyAddress = dataTable.Rows[0]["phyAddress"].ToString(),
                };
                return customerInfo;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}