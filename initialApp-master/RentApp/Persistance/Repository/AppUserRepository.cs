using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace RentApp.Persistance.Repository
{
    public class AppUserRepository : Repository<AppUser, int>, IAppUserRepository
    {
        public AppUserRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<AppUser> GetAll(int pageIndex, int pageSize)
        {
            return DemoContext.AppUsers.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected DemoContext DemoContext { get { return context as DemoContext; } }
    }
}