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

namespace RentApp.Controllers
{
    public class BranchOfficesController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public BranchOfficesController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<BranchOffice> GetBranchOffices()
        {
            return unitOfWork.BranchOffices.GetAll();
        }

        [ResponseType(typeof(BranchOffice))]
        public IHttpActionResult GetBranchOffice(int id)
        {
            BranchOffice branchOffice = unitOfWork.BranchOffices.Get(id);
            if (branchOffice == null)
            {
                return NotFound();
            }

            return Ok(branchOffice);
        }

        [ResponseType(typeof(void))]
        public IHttpActionResult PutBranchOffice(int id, BranchOffice branchOffice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != branchOffice.Id)
            {
                return BadRequest();
            }

            try
            {
                unitOfWork.BranchOffices.Update(branchOffice);
                unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchOfficeExists(id))
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

        [ResponseType(typeof(BranchOffice))]
        public IHttpActionResult PostBranchOffice(BranchOffice branchOffice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            unitOfWork.BranchOffices.Add(branchOffice);
            unitOfWork.Complete();

            return CreatedAtRoute("DefaultApi", new { id = branchOffice.Id }, branchOffice);
        }

        [ResponseType(typeof(BranchOffice))]
        public IHttpActionResult DeleteBranchOffice(int id)
        {
            BranchOffice branchOffice = unitOfWork.BranchOffices.Get(id);
            if (branchOffice == null)
            {
                return NotFound();
            }

            unitOfWork.BranchOffices.Remove(branchOffice);
            unitOfWork.Complete();

            return Ok(branchOffice);
        }

        private bool BranchOfficeExists(int id)
        {
            return unitOfWork.BranchOffices.Get(id) != null;
        }
    }
}