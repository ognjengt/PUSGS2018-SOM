using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Linq.Expressions;

namespace RentApp.Persistance.Repository
{
    public class VehicleRepository : Repository<Vehicle, int>, IVehicleRepository
    {
        public VehicleRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<Vehicle> GetAll(int pageIndex, int pageSize)
        {
            return Context.Vehicles.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        protected RADBContext Context { get { return RADBContext.Create(); } }
    }
}