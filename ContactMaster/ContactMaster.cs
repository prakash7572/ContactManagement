
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Xml.Linq;

namespace ContactMaster
{
    public class ContactMaster : IContactMaster
    {
        readonly IContactMaster contactMaster;
        readonly string? _connectionString;
        public ContactMaster(IContactMaster contactMaster, IConfiguration iContactMaster)
        {
            this.contactMaster = contactMaster;
            _connectionString = iContactMaster.GetConnectionString("DefaultConnection");
        }

        public Task<CMS> Delete()
        {
            throw new NotImplementedException();
        }

        //public async Task<CMS> Fetch(int id = 0)
        //{
        //    using var conn = new SqlConnection(_connectionString);
        //    using var cmd = new SqlCommand("SELECT * FROM CMS WHERE ID = @ID", conn);
        //    cmd.Parameters.AddWithValue("@ID", id);

        //    await conn.OpenAsync();
        //    using var reader = await cmd.ExecuteReaderAsync();

        //    if (await reader.ReadAsync())
        //    {
        //        return new CMS
        //        {
        //            ID = (int)reader["ID"],
        //            UserName = (string)reader["UserName"],
        //            Email = (string)reader["Email"],
        //            Password = (string)reader["Password"],
        //            FirstName = (string)reader["FirstName"],
        //            LastName = (string)reader["LastName"],
        //            Address = (string)reader["Address"]
        //        };
        //    }

        //    return CMS; // Not found
        //}

        public async Task<Response<CMS>> MergeActionAsync(CMS cms)
        {
            try
            {
                using var conn = new SqlConnection(_connectionString);
                using var cmd = new SqlCommand("Prodcedue", conn)
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

                return new Response<CMS>(true, cms, "CMS merged successfully!", 200);
            }
            catch (Exception ex)
            {
                return new Response<CMS>(false, null, $"Error: {ex.Message}", 500);
            }
        }



    }
}
