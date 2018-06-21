using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Linq.Expressions;
using RentApp.Models;

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

        public IEnumerable<Vehicle> SearchVehicles(SearchVehicleRequestModel vehicle)
        {
            
            var queryChain = Context.Vehicles.ToList();
            if (!String.IsNullOrEmpty(vehicle.Model))
            {
                queryChain = queryChain.Where(v => v.Model.ToLower().Contains(vehicle.Model.ToLower())).ToList();
            }
            if (!String.IsNullOrEmpty(vehicle.Manufactor))
            {
                queryChain = queryChain.Where(v => v.Manufactor.ToLower().Contains(vehicle.Manufactor.ToLower())).ToList();
            }
            if (vehicle.Year != 0)
            {
                queryChain = queryChain.Where(v => v.Year == vehicle.Year).ToList();
            }
            if (!String.IsNullOrEmpty(vehicle.Type))
            {
                queryChain = queryChain.Where(v => v.Type.Name.ToLower().Contains(vehicle.Type.ToLower())).ToList();
            }
            if (vehicle.PricePerHour != 0)
            {
                queryChain = queryChain.Where(v => v.PricePerHour == vehicle.PricePerHour).ToList();
            }
            return queryChain;
        }

        protected RADBContext Context { get { return RADBContext.Create(); } }
    }
}