using System.Data;
using System.Data.SqlClient;
using StoreManagementApi.Connection;

namespace StoreManagementApi.Implimentations.Common
{
    public class CommonCls
    {        
        DbConnect dbConnection = new DbConnect();
        DataTable dataTable = new DataTable();
        SqlCommand sqlCmd = new SqlCommand();
        
        public SqlCommand DynamicMethod(string spName)
        {
            SqlConnection sqlCon = dbConnection.Connect();
            sqlCmd.CommandType = CommandType.StoredProcedure;
            sqlCmd.CommandText = spName;
            sqlCmd.Connection = sqlCon;
            return sqlCmd;
        }
        public DataTable getDynamicMethod(string spName, string actionFlg, int custId)
        {
            sqlCmd = DynamicMethod(spName);
            sqlCmd.Parameters.AddWithValue("@actionFlg", actionFlg);
            sqlCmd.Parameters.AddWithValue("@customerId", custId);
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCmd);
            sqlDataAdapter.Fill(dataTable);
            sqlCmd.Connection.Close();
            return dataTable;
        }
    }
}