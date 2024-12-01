using Newtonsoft.Json;
using StoreManagementApi.Contracts;
using StoreManagementApi.Entity;
using StoreManagementApi.Implimentations.Common;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;

namespace StoreManagementApi.Implimentations
{
    public class AuthorizationCls : IAuthorization
    {
        CommonCls comMethod = new CommonCls();
        public Task<string?> GenerateSysPassword()
        {

            string? sysGemPassword = Guid.NewGuid().ToString();
            return Task.FromResult((string?)sysGemPassword);
        }
        public Task<string?> GenerateSysPassword(string? passValue)
        {
            string? sysGemPassword = EncryptPassword(passValue);
            return Task.FromResult((string?)sysGemPassword);
        }
        private static string EncryptPassword(string? reqPassValue)
        {
            string? sysGemPassword = string.Empty;
            if (reqPassValue == null || reqPassValue.Length == 0)
                throw new ArgumentNullException(nameof(reqPassValue));
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.KeySize = 256;
                aesAlg.BlockSize = 128;
                aesAlg.GenerateKey();
                aesAlg.GenerateIV();
                using (var memoryStream = new System.IO.MemoryStream())
                {
                    using (var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV))
                    using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                    using (var writer = new System.IO.StreamWriter(cryptoStream))
                    {
                        writer.Write(reqPassValue);
                    }
                    byte[] encryptedPass = memoryStream.ToArray();
                    sysGemPassword = Convert.ToBase64String(encryptedPass);
                }
            }
            return sysGemPassword;
        }
        public Task<string?> CheckAuthorization(LoginModel loginInfo)
        {
            string? authResult = string.Empty;
            var res = GetUserInfo(loginInfo);
            if (loginInfo?.username?.ToUpper() == res?.username?.ToUpper() && loginInfo?.password == res?.password)
            {
                authResult = res?.action;
            }
            authResult = JsonConvert.SerializeObject(authResult);
            return Task.FromResult((string?)authResult);
        }

        private LoginModel? GetUserInfo(LoginModel userReq)
        {
            string? actionFlg = userReq.action.ToUpper().Equals("LOGIN") ? "GETUSERLOGIN" : "UPDTPASS";
            LoginModel? userInfo = new LoginModel();
            SqlCommand sqlCmd = comMethod.DynamicMethod("UST_USERLOGIN_ACTIONS");
            sqlCmd.Parameters.AddWithValue("@email", userReq.username);
            sqlCmd.Parameters.AddWithValue("@password", userReq.password);
            sqlCmd.Parameters.AddWithValue("@confirmPassword", userReq.confPass);
            sqlCmd.Parameters.AddWithValue("@actionFlg", actionFlg);
            sqlCmd.ExecuteNonQuery();
            DataTable dataTable = new DataTable();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCmd);
            sqlDataAdapter.Fill(dataTable);
            foreach (DataRow dataRow in dataTable.Rows)
            {
                var userLogin = new LoginModel()
                {
                    username = dataRow["username"].ToString(),
                    password = dataRow["password"].ToString(),
                    confPass = dataRow["confirmPassword"].ToString(),
                    action = dataRow["result"].ToString(),
                };
                userInfo = userLogin;
            }
            return userInfo;
        }
    }
}