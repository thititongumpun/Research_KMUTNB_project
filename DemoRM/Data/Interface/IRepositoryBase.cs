using System;
using System.Linq;
using System.Linq.Expressions;

namespace DemoRM.Data.Repository.Interface
{
    public interface IRepositoryBase<T> where T : class
    {
        public T GetById(int id);
        public IQueryable<T> GetAll();
        public IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression);
        public void Add(T entity);
        public void Update(T entity);
        public void Remove(T entity);
        public void Save();
    }
}
