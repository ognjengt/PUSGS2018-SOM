using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace RentApp.Persistance.Repository
{
    public class RentRepository : Repository<Rent, int>, IRentRepository
    {
        public RentRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Rent> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.Rents.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected DemoContext DemoContext { get { return context as DemoContext; } }
    }
}