using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class BandListSpecification : BaseSpecification<Product, string>
    {
        public BandListSpecification()
        {
            AddSelect(x => x.Brand);
            ApplyDisttinct();
        }
    }
}