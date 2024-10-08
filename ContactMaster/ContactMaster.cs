
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace ContactMaster
{
    public class ContactMaster : IContactMaster
    {
        readonly string? _connectionString;
        readonly DataTable _dataTable;
        public ContactMaster(IConfiguration iContactMaster, DataTable dataTable)
        {
            this._connectionString = iContactMaster.GetConnectionString("DefaultConnection");
            this._dataTable = dataTable;
        }

        public Task<CMS> Delete()
        {
            throw new NotImplementedException();
        }

        public async Task<Response<CMS>> Favourite(int id, bool isFavourite)
        {
            try
            {
                using var conn = new SqlConnection(_connectionString);
                using var cmd = new SqlCommand("SP_ContactManagement", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@IsFavourite", isFavourite);
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@QueryType", "Favourite");

                await conn.OpenAsync();
                await cmd.ExecuteNonQueryAsync();
                using var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(_dataTable);

                return new Response<CMS>(true, _dataTable, "", 200);
            }
            catch (Exception ex)
            {
                return new Response<CMS>(false, null, $"Error: {ex.Message}", 500);
            }
        }

        public async Task<Response<CMS>> Fetch(int id = 0)
            {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("SP_ContactManagement", conn)
            {
                CommandType = CommandType.StoredProcedure
            };
            cmd.Parameters.AddWithValue("@ID", id);
            cmd.Parameters.AddWithValue("@QueryType", id== 0 ? "FETCH_ALL" : "FETCH_ONE");
            await conn.OpenAsync();
            using var adapter = new SqlDataAdapter(cmd);
            adapter.Fill(_dataTable);

            if (_dataTable.Rows.Count > 0)
            {
                return new Response<CMS>(true, _dataTable, "Data Fetch Successfully !!", 200);
            }
            return new Response<CMS>(false, null, "No data found!", 404);
        }


        public async Task<Response<CMS>> MergeAction(CMS cms)
        {
            try
            {
                using var conn = new SqlConnection(_connectionString);
                using var cmd = new SqlCommand("SP_ContactManagement", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@UserName", cms.UserName);
                cmd.Parameters.AddWithValue("@Email", cms.Email);
                cmd.Parameters.AddWithValue("@Password", cms.Password);
                cmd.Parameters.AddWithValue("@ConfirmPassword", cms.ConfirmPassword);
                cmd.Parameters.AddWithValue("@FirstName", cms.FirstName);
                cmd.Parameters.AddWithValue("@LastName", cms.LastName);
                cmd.Parameters.AddWithValue("@Address", cms.Address);
                cmd.Parameters.AddWithValue("@ID", cms.ID);
                cmd.Parameters.AddWithValue("@QueryType", cms.ID == 0 ? "INSERT" : "UPDATE");

                await conn.OpenAsync();
                await cmd.ExecuteNonQueryAsync();
                using var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(_dataTable);

                return new Response<CMS>(true, _dataTable,"", 200);
            }
            catch (Exception ex)
            {
                return new Response<CMS>(false, null, $"Error: {ex.Message}", 500);
            }
        }



    }
}
