using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddressDto
    {
        [Required]
        public  string Line1 { get; set; } = string.Empty;

        public  string? Line2 { get; set; }

        [Required]
        public required string City { get; set; }= string.Empty;

        [Required]
        public required string State { get; set; }= string.Empty;

        [Required]
        public required string PostalCode { get; set; }= string.Empty;
        
        [Required]
        public required string Country { get; set; }= string.Empty;
    }
}