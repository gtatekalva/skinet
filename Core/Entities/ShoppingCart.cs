using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ShoppingCart
    {
        public required string Id { get; set; }

        public List<CartItems> Items { get; set; } = [];
    }
}