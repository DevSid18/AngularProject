using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using StoreManagementApi.Contracts;
using OfficeOpenXml;
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
                if (!string.IsNullOrEmpty(customer?.action))
                {
                    string? password = (customer?.customerId == 0) ? authCls.GenerateSysPassword(customer?.firstName).Result : customer?.password;
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

                    if (customer?.customerId == 0)
                        sqlCmd.Parameters.AddWithValue("@createdDate", DateTime.Now);
                    else
                        sqlCmd.Parameters.AddWithValue("@updatedDate", DateTime.Now);
                    int i = sqlCmd.ExecuteNonQuery();
                    sqlCmd.Connection.Close();
                    var result = i > 0 ? ActionStatus.Success.ToString() : ActionStatus.Success.ToString();
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
                            email = dataRow["email"].ToString(),
                            contact = dataRow["contact"].ToString(),
                            phyAddress = dataRow["phyAddress"].ToString(),
                            gender = dataRow["gender"].ToString(),
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
        //private void SendEmailNotification(string email, string subject, string body)
        //{
        //    try
        //    {
        //        var smtpClient = new SmtpClient("smtp.example.com")
        //        {
        //            Port = 587,
        //            Credentials = new NetworkCredential("username", "password"),
        //            EnableSsl = true,
        //        };
        //        smtpClient.Send("noreply@example.com", email, subject, body);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log error
        //    }
        //}

        public string ExcelExport(List<CustomerModel> exclModel)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            string? fileStatus = string.Empty;
            try
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                string projectRootPath = Directory.GetParent(currentDirectory).Parent.Parent.Parent.FullName;
                string customerDocumentsPath = Path.Combine(projectRootPath, "GitProject", "AngularProject", "Documents", "CustomerDocuments");
                string fileName = "Customer_Excel_Report_" + DateTime.Now.ToString("yyyy_MM_dd") + ".xlsx";
                string filePath = Path.Combine(customerDocumentsPath, fileName);

                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add("Customers");

                    worksheet.Cells[1, 1].Value = "Customer ID";
                    worksheet.Cells[1, 2].Value = "First Name";
                    worksheet.Cells[1, 3].Value = "Middle Name";
                    worksheet.Cells[1, 4].Value = "Last Name";
                    worksheet.Cells[1, 5].Value = "Email";
                    worksheet.Cells[1, 6].Value = "Contact";
                    worksheet.Cells[1, 7].Value = "Address";
                    worksheet.Cells[1, 8].Value = "Gender";
                    worksheet.Cells[1, 9].Value = "Password";
                    worksheet.Cells[1, 10].Value = "Confirm Password";
                    worksheet.Cells[1, 11].Value = "Country";
                    worksheet.Cells[1, 12].Value = "State";
                    worksheet.Cells[1, 13].Value = "District";
                    //worksheet.Cells[1, 14].Value = "IsActive";

                    int row = 2;
                    foreach (var customer in exclModel)
                    {
                        worksheet.Cells[row, 1].Value = customer.customerId;
                        worksheet.Cells[row, 2].Value = customer.firstName;
                        worksheet.Cells[row, 3].Value = customer.middleName;
                        worksheet.Cells[row, 4].Value = customer.lastName;
                        worksheet.Cells[row, 5].Value = customer.email;
                        worksheet.Cells[row, 6].Value = customer.contact;
                        worksheet.Cells[row, 7].Value = customer.phyAddress;
                        worksheet.Cells[row, 8].Value = customer.gender;
                        worksheet.Cells[row, 9].Value = customer.password;
                        worksheet.Cells[row, 10].Value = customer.confirmPassword;
                        worksheet.Cells[row, 11].Value = customer.country;
                        worksheet.Cells[row, 12].Value = customer.state;
                        worksheet.Cells[row, 13].Value = customer.district;
                        //worksheet.Cells[row, 14].Value = customer.isActive;

                        row++;
                    }
                    FileInfo file = new FileInfo(filePath);
                    package.SaveAs(file);
                }
                fileStatus = $"Excel file saved at {fileName}";
            }
            catch (Exception ex)
            {
                fileStatus = "Error: " + ex.Message;
            }
            return fileStatus;
        }

        //private bool ValidateCustomer(CustomerModel customer)
        //{
        //    if (string.IsNullOrEmpty(customer.firstName) || string.IsNullOrEmpty(customer.lastName))
        //    {
        //        return false;
        //    }
        //    if (!Regex.IsMatch(customer.email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
        //    {
        //        return false; // Invalid email format
        //    }
        //    if (!Regex.IsMatch(customer.contact, @"^\+?[1-9]\d{1,14}$"))
        //    {
        //        return false; // Invalid phone number format
        //    }
        //    return true;
        //}




    }
}