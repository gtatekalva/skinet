using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductSpecification : BaseSpecification<Product>
    {
        public ProductSpecification(ProductSpecParams specParam) : base(x =>
            (string.IsNullOrWhiteSpace(specParam.Search) || x.Name.ToLower().Contains(specParam.Search)) &&
            (specParam.Brands.Count == 0 || specParam.Brands.Contains(x.Brand)) &&
            (specParam.Types.Count == 0 || specParam.Types.Contains(x.Type))
        )
        {

            ApplyPaging(specParam.Pagesize * (specParam.PageIndex-1), specParam.Pagesize);

            switch (specParam.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDesc(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }
    }
}