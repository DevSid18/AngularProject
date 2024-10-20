using System.Data.SqlClient;

namespace StoreManagementApi.Connection
{
    public class DbConnect
    {
        public SqlConnection Connect()
        {
            SqlConnection sqlCon = new SqlConnection();
            // sqlCon.ConnectionString = @"Data Source=(localdb)/mssqllocaldb;Initial Catalog=StoreManagementDb;Integrated Security=True";
            sqlCon = new SqlConnection(@"Data Source=DESKTOP-31SK2J9;Initial Catalog=StoreManagementDb;User ID=sa;Password=Game@123");
            if (sqlCon.State == System.Data.ConnectionState.Open)
            {
                sqlCon.Close();
            }
            else
            {
                sqlCon.Open();
            }
            return sqlCon;
        }
    }
}