using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiErrorResponse(int statusCode, string msg, string? details)
    {
        public int StatusCode { get; set; } = statusCode;

        public string Message { get; set; } = msg; 

        public string? Details { get; set; } = details;
    }
}