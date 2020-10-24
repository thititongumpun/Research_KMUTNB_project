using System;
using System.Linq;
using System.Linq.Expressions;
using DemoRM.Data.Repository.Interface;

namespace DemoRM.Data.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly DataContext context;
        public RepositoryBase(DataContext context)
        {
            this.context = context;
        }

        public virtual T GetById(int id)
        {
            return context.Set<T>().Find(id);
        }

        public virtual IQueryable<T> GetAll()
        {
            return context.Set<T>();
        }

        public virtual IQueryable<T> GetByCondition(Expression<Func<T, bool>> expression)
        {
            return context.Set<T>().Where(expression);
        }


        public void Add(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void Remove(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            context.Set<T>().Update(entity);
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}