using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Interfaces;

namespace Core.Specifications
{
    public class BaseSpecification<T> : ISpecification<T>
    {
        private readonly Expression<Func<T, bool>>? _criteria;

        public BaseSpecification(Expression<Func<T, bool>>? criteria)
        {
            _criteria = criteria;
        }

        protected BaseSpecification() : this(null) {}

        public Expression<Func<T, bool>> Criteria => _criteria;

        public Expression<Func<T, object>>? OrderBy {get; private set;}

        public Expression<Func<T, object>> OrderByDescending {get; private set;}

        public bool IsDistinct {get; private set;}

        public int Take{get; private set;}

        public int Skip {get; private set;}

        public bool IsPagingEnabled {get; private set;}

        public IQueryable<T> ApplyCriteria(IQueryable<T> query)
        {
           if(Criteria != null)
           {
            query = query.Where(Criteria);
           }

           return query;
        }

        protected void AddOrderBy(Expression<Func<T, object>> orderByExpression)
        {
            OrderBy = orderByExpression;
        }

         protected void AddOrderByDesc(Expression<Func<T, object>> orderByDescExpression)
        {
            OrderByDescending = orderByDescExpression;
        }

        protected void ApplyDisttinct()
        {
            IsDistinct = true;
        }

        protected void ApplyPaging(int skip, int take)
        {
            Skip = skip;
            Take = take;
            IsPagingEnabled = true;
        }
    }

    public class BaseSpecification<T, TResult>(Expression<Func<T, bool>> criteria)
            : BaseSpecification<T>(criteria), ISpecification<T, TResult>
    {
        protected BaseSpecification() : this(null!) {}

        public Expression<Func<T, TResult>>? Select {get; private set;}

        protected void AddSelect(Expression<Func<T, TResult>> selectExp)
        {
            Select = selectExp;
        }
    }

}