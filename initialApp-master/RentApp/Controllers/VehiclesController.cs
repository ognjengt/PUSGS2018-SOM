using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RentApp.Models.Entities;
using RentApp.Persistance;
using RentApp.Persistance.UnitOfWork;
using RentApp.Models;

namespace RentApp.Controllers
{
    [RoutePrefix("api/Vehicles")]
    public class VehiclesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [Route("GetVehicles")]
        public IEnumerable<Vehicle> GetVehicles()
        {
            return unitOfWork.Vehicles.GetAll();
        }

        [Route("GetVehicle")]
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult GetVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        [Route("AddVehicles")]
        public IHttpActionResult AddVehicle(Vehicle vehicle)
        {
            this.unitOfWork.Vehicles.Add(vehicle);
            return Ok();
        }

        [Route("PutVehicle")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicle(int id, VehicleRequestModel vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            try
            {
                var vs = unitOfWork.Vehicles.GetAll();
                Vehicle v = vs.ToList<Vehicle>().Where(ve => ve.Id == id).ToList().First();
                v.Id = id;
                v.Model = vehicle.Model;
                v.Description = vehicle.Description;
                v.Manufactor = vehicle.Manufactor;
                v.Year = vehicle.Year;
                v.PricePerHour = vehicle.PricePerHour;
                var types = unitOfWork.VehicleTypes.GetAll();
                v.Type = (VehicleType)types.ToList<VehicleType>().Where(t => t.Name == vehicle.Type).ToList().First();
                //v.Images = vehicle.Images;

                unitOfWork.Vehicles.Update(v);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("PutVehicleAvailability")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVehicleAvailability(int id, Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Vehicles.Update(vehicle);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("PostVehicle")]
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult PostVehicle(VehicleRequestModel vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Vehicle v = new Vehicle();
            v.Model = vehicle.Model;
            v.Description = vehicle.Description;
            v.Manufactor = vehicle.Manufactor;
            v.Year = vehicle.Year;
            v.PricePerHour = vehicle.PricePerHour;
            var types = unitOfWork.VehicleTypes.GetAll();
            v.Type = (VehicleType)types.ToList<VehicleType>().Where(t => t.Name == vehicle.Type).ToList().First();
            //v.Images = vehicle.Images;

            Service service = unitOfWork.Services.Get(vehicle.ServiceId);

            try
            {
                unitOfWork.Vehicles.Add(v);
                service.Vehicles.Add(v);
                unitOfWork.Complete();

                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound();
            }

            return Ok();
        }

        [Route("DeleteVehicle")]
        [ResponseType(typeof(Vehicle))]
        public IHttpActionResult DeleteVehicle(int id)
        {
            Vehicle vehicle = unitOfWork.Vehicles.Get(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            unitOfWork.Vehicles.Remove(vehicle);
            unitOfWork.Complete();

            return Ok(vehicle);
        }

        private bool VehicleExists(int id)
        {
            return unitOfWork.Vehicles.Get(id) != null;
        }
    }
}