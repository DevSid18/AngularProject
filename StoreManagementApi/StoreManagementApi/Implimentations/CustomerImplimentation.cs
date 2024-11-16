using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using StoreManagementApi.Contracts;
using StoreManagementApi.Entity;
using StoreManagementApi.Implimentations.Common;

namespace StoreManagementApi.Implimentations
{
    public class CustomerImplimentation : ICustomer
    {
        List<CustomerModel> customers = new List<CustomerModel>();
        CommonCls comMethod = new CommonCls();
        AuthorizationCls authCls = new AuthorizationCls();
        string actnFlg = string.Empty;

        public string? CustomerActions(CustomerModel customer)
        {
            try
            {
                string? password = (customer?.customerId == 0) ? authCls.GenerateSysPassword(customer?.firstName).Result : customer?.password;                
                if (!string.IsNullOrEmpty(customer?.action))
                {
                    SqlCommand sqlCmd = comMethod.DynamicMethod("USP_CUSTOMERS_ACTIONS");
                    actnFlg = !string.IsNullOrEmpty(customer?.action) &&
                    customer?.action?.ToLower() == "register" ? ActoinFlg.INSERT.ToString() :
                    customer?.action?.ToLower() == "edit" ? ActoinFlg.UPDATE.ToString() :
                    customer?.action?.ToLower() == "delete" ? ActoinFlg.DELETE.ToString() : string.Empty;

                    sqlCmd.Parameters.AddWithValue("@actionFlg", actnFlg);
                    sqlCmd.Parameters.AddWithValue("@customerId", customer?.customerId);
                    sqlCmd.Parameters.AddWithValue("@firstName", customer?.firstName);
                    sqlCmd.Parameters.AddWithValue("@middleName", customer?.middleName);
                    sqlCmd.Parameters.AddWithValue("@lastName", customer?.lastName);
                    sqlCmd.Parameters.AddWithValue("@country", customer?.country);
                    sqlCmd.Parameters.AddWithValue("@state", customer?.state);
                    sqlCmd.Parameters.AddWithValue("@district", customer?.district);
                    sqlCmd.Parameters.AddWithValue("@phyAddress", customer?.phyAddress);
                    sqlCmd.Parameters.AddWithValue("@email", customer?.email);
                    sqlCmd.Parameters.AddWithValue("@contact", customer?.contact);
                    sqlCmd.Parameters.AddWithValue("@gender", customer?.gender);
                    sqlCmd.Parameters.AddWithValue("@password", password);
                    sqlCmd.Parameters.AddWithValue("@confirmPassword", customer?.confirmPassword);                 
                    sqlCmd.Parameters.AddWithValue("@isActive", customer?.isActive);
                    sqlCmd.Parameters.AddWithValue("@action", customer?.action);
                    sqlCmd.Parameters.AddWithValue("@result", customer?.result);
                    if (customer?.customerId == 0)
                        sqlCmd.Parameters.AddWithValue("@createdDate", DateTime.Now);
                    else
                        sqlCmd.Parameters.AddWithValue("@updatedDate", DateTime.Now);
                    int i = sqlCmd.ExecuteNonQuery();
                    sqlCmd.Connection.Close();
                    var result = i > 0 ? "success" : "failed";
                    customers.Add(new CustomerModel { result = result });
                }
                else
                {
                    actnFlg = customer?.customerId == 0 ? ActoinFlg.SELECT.ToString() : ActoinFlg.GETUSER.ToString();
                    DataTable dataTable = comMethod.getDynamicMethod("USP_CUSTOMERS_ACTIONS", actnFlg, customer.customerId);
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
                            gender = dataRow["gender"].ToString(),
                            password = dataRow["password"].ToString(),
                            confirmPassword = dataRow["confirmPassword"].ToString(),
                            country = dataRow["country"].ToString(),
                            state = dataRow["state"].ToString(),
                            district = dataRow["district"].ToString(),
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                customers.Add(new CustomerModel { result = ex.Message });
            }
            return JsonConvert.SerializeObject(customers);
        }
    }
}