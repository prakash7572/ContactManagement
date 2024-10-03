
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

        public Task<CMS> Fetch(int id = 0)
        {
            throw new NotImplementedException();
        }

        public Task<CMS> MergeAction(CMS cms)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("Prodcedue", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@UserName", cms.UserName);
                        cmd.Parameters.AddWithValue("@Email", cms.Email);
                        cmd.Parameters.AddWithValue("@Password", cms.Password);
                        cmd.Parameters.AddWithValue("@ConfirmPassword", cms.ConfirmPassword);
                        cmd.Parameters.AddWithValue("@FirstName", cms.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", cms.LastName);
                        cmd.Parameters.AddWithValue("@Password", cms.Password);
                        cmd.Parameters.AddWithValue("@Address", cms.Address);
                        cmd.Parameters.AddWithValue("@ID", cms.ID);
                        cmd.Parameters.AddWithValue("@QueryType" ,cms.ID == 0 ? "INSERT" : "UPDATE" );

                        conn.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
            throw new NotImplementedException();
        }
    }
}
