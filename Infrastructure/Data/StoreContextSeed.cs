using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.Products.Any())
            {
                var prodData = await File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");

                var prods = JsonSerializer.Deserialize<List<Product>>(prodData);

                if(prods == null) return;

                context.Products.AddRange(prods);

                await context.SaveChangesAsync();
            }
        }
    }
}