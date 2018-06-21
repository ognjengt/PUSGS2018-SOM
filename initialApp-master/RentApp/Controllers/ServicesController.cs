﻿using System;
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
using Microsoft.Owin.Security.DataHandler;
using System.IdentityModel.Tokens;

namespace RentApp.Controllers
{
    [RoutePrefix("api/Services")]
    public class ServicesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public ServicesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [Route("GetServices")]
        public IEnumerable<Service> GetServices()
        {
            return unitOfWork.Services.GetAll();
        }

        [Route("GetService")]
        [ResponseType(typeof(Service))]
        public IHttpActionResult GetService(string id)
        {
            Service service = unitOfWork.Services.Get(Int32.Parse(id));
            if (service == null)
            {
                return NotFound();
            }

            return Ok(service);
        }

        [Route("AddServices")]
        public IHttpActionResult AddService(Service service)
        {
            this.unitOfWork.Services.Add(service);
            return Ok();
        }

        [ResponseType(typeof(void))]
        [Route("PutService")]        
        public IHttpActionResult PutService(int id, Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != service.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.Services.Update(service);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
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

        [Authorize(Roles = "Manager")]
        [ResponseType(typeof(Service))]
        public IHttpActionResult PostService(Service service)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Izvuci iz heada jwt i uzmi koji je user
            string jwt = Request.Headers.Authorization.Parameter.ToString();
            var decodedToken = unitOfWork.AppUserRepository.DecodeJwt(jwt);

            string userEmail = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;

            AppUser current = unitOfWork.AppUserRepository.GetAll().Where(u => u.Email == userEmail).FirstOrDefault();
            service.ManagerId = current.Id;

            unitOfWork.Services.Add(service);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = service.Id }, service);
        }

        [Route("DeleteService")]
        public IHttpActionResult DeleteService(string id)
        {
            Service service = unitOfWork.Services.Get(Int32.Parse(id));                   
            unitOfWork.Reviews.RemoveRange(service.Reviews);
            service.Reviews.Clear();
            unitOfWork.BranchOffices.RemoveRange(service.BranchOffices);
            service.BranchOffices.Clear();
            unitOfWork.Vehicles.RemoveRange(service.Vehicles);
            service.Vehicles.Clear();
            unitOfWork.Complete();

            if (service == null)
            {
                return NotFound();
            }

            unitOfWork.Services.Remove(service);
            unitOfWork.Complete();

            return Ok(service);
        }

        // Autorizuje servis da postane vidljiv
        [Route("GetAwaitingServices")]
        public IEnumerable<Service> GetAwaitingServices()
        {
            return unitOfWork.Services.GetAwaitingServices();
        }

        // Autorizuje servis da postane vidljiv
        [Route("AuthorizeService")]
        public string AuthorizeService([FromBody]string Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState).ToString();
            }
            //Get user data, and update activated to true
            Service current = unitOfWork.Services.Get(Int32.Parse(Id));
            current.Authorized = true;

            try
            {
                unitOfWork.Services.Update(current);
                unitOfWork.Complete();

                string subject = "Service approved";
                string desc = $"Dear Manager, Your service {current.Name} has been approved. Block 8 team.";
                var managerEmail = unitOfWork.AppUserRepository.Get(current.Id).Email;
                unitOfWork.AppUserRepository.NotifyViaEmail(managerEmail, subject, desc);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest().ToString();
            }

            return "Ok";
        }

        [Authorize]
        [Route("PostReview")]
        public IHttpActionResult PostReview([FromBody]ReviewRequestModel reviewRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Izvuci iz heada jwt i uzmi koji je user
            string jwt = Request.Headers.Authorization.Parameter.ToString();
            var decodedToken = unitOfWork.AppUserRepository.DecodeJwt(jwt);

            string userEmail = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;

            Review review = new Review();
            review.Comment = reviewRequest.Comment;
            review.DatePosted = DateTime.Now;
            review.Stars = reviewRequest.Stars;
            review.User = userEmail;

            Service service = unitOfWork.Services.Get(reviewRequest.ServiceId);

            try
            {
                unitOfWork.Reviews.Add(review);
                service.Reviews.Add(review);
                unitOfWork.Complete();
            }
            catch (Exception)
            {

                return NotFound();
            }
            

            return Ok();
        }



        private bool ServiceExists(int id)
        {
            return unitOfWork.Services.Get(id) != null;
        }
    }
}