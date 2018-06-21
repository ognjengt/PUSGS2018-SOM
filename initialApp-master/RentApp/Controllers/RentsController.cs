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
    [RoutePrefix("api/Rents")]
    public class RentsController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public RentsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [Route("GetRents")]
        public IEnumerable<Rent> GetRents()
        {
            return unitOfWork.Rents.GetAll();
        }

        [ResponseType(typeof(Rent))]
        public IHttpActionResult GetRent(int id)
        {
            Rent rent = unitOfWork.Rents.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            return Ok(rent);
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutRent(int id, Rent rent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rent.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Rents.Update(rent);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentExists(id))
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
    
        [Authorize]
        [Route("PostRent")]
        public string PostRent(RentRequestModel rentRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState).ToString();
            }

            Rent r = new Rent();
            r.Start = rentRequest.Start;
            r.End = rentRequest.End;
            r.Vehicle = unitOfWork.Vehicles.Get(rentRequest.VehicleId);
            r.BranchOffice = unitOfWork.BranchOffices.Get(rentRequest.BranchOfficeId);
            r.Vehicle.Unavailable = true;
            // Izvuci iz heada jwt i uzmi koji je user
            string jwt = Request.Headers.Authorization.Parameter.ToString();
            var decodedToken = unitOfWork.AppUserRepository.DecodeJwt(jwt);

            string userEmail = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            AppUser appUser = unitOfWork.AppUserRepository.GetAll().Where(u => u.Email == userEmail).FirstOrDefault();
            

            try
            {
                unitOfWork.Rents.Add(r);
                appUser.Rents.Add(r);
                unitOfWork.Complete();
            }
            catch (Exception)
            {
                return InternalServerError().ToString();
            }


            return "Ok";
        }

        [ResponseType(typeof(Rent))]
        public IHttpActionResult DeleteRent(int id)
        {
            Rent rent = unitOfWork.Rents.Get(id);
            if (rent == null)
            {
                return NotFound();
            }

            unitOfWork.Rents.Remove(rent);
            unitOfWork.Complete();

            return Ok(rent);
        }

        private bool RentExists(int id)
        {
            return unitOfWork.Rents.Get(id) != null;
        }
    }
}