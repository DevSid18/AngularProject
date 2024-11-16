using StoreManagementApi.Contracts;
using System.Security.Cryptography;

namespace StoreManagementApi.Implimentations
{
    public class AuthorizationCls : IAuthorization
    {
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
    }
}