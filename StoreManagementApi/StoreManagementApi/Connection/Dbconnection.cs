using System.Data.SqlClient;

namespace StoreManagementApi.Connection
{
    public class DbConnect
    {
        private readonly IConfiguration _configuration;
        public DbConnect()
        {            
            var builder = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            _configuration = builder.Build();
        }
        public SqlConnection Connect()
        {
            SqlConnection sqlCon = null;
            string connectionString1 = _configuration.GetConnectionString("user1");
            string connectionString2 = _configuration.GetConnectionString("user2");

            try
            {                
                sqlCon = new SqlConnection(connectionString1);
                sqlCon.Open();
            }
            catch (Exception)
            {
                try
                {
                    sqlCon = new SqlConnection(connectionString2);
                    sqlCon.Open();
                }
                catch (Exception ex)
                {
                    throw new Exception("Both connections failed: " + ex.Message);
                }
            }
            return sqlCon;
        }

    }
}