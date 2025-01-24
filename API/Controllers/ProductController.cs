using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    
    public class ProductsController(IGenericRepository<Product> repo) : BaseAPIController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery]ProductSpecParams specParam)
        {
            var spec = new ProductSpecification(specParam);

            // var products = await repo.ListAsync(spec);

            // var count = await repo.CountAsync(spec);

            // var pagination = new Pagination<Product>(specParam.PageIndex, specParam.Pagesize, count, products);

            var pagination = await CreatePagedResults(repo, spec, specParam.PageIndex, specParam.Pagesize);

            return Ok(pagination);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await repo.GetByIdAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            repo.Add(product);

            if (await repo.SaveAllAsync())
            {
                return CreatedAtAction("GetProduct", new { id = product.ID }, product);
            }

            return BadRequest("Problem creating the product");
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            if (product.ID != id || !ProdctExists(id))
                return BadRequest("Cannot update this product");

            repo.update(product);

            if (await repo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed product update");
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var prod = await repo.GetByIdAsync(id);

            if (prod == null) return NotFound();

            repo.Remove(prod);

            if (await repo.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed product delete");
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        {
            var spec = new BandListSpecification();

            return Ok(await repo.ListAsync(spec));
        }


        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        {

            var spec = new TypeListSpecification();

            return Ok(await repo.ListAsync(spec));
        }

        private bool ProdctExists(int id)
        {
            return repo.Exists(id);
        }

    }
}