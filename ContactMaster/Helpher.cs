using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactMaster
{
    public class Response<T>
    {
        public bool IsSuccess { get; set; }
        public DataTable? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public int StatusCode { get; set; }

        public Response(bool isSuccess, DataTable? data=null, string message="", int statusCode=0)
        {
            IsSuccess = isSuccess;
            Data = data;
            Message = message;
            StatusCode = statusCode;
        }

        public Response(bool isSuccess, DataTable? data = null) 
        {
            IsSuccess = isSuccess;
            Data = data;
        }

        public Response(DataTable? data = null)
        {
            Data = data;
        }
    }



}
