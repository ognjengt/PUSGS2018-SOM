﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }

        public List<Vehicle> Vehicles { get; set; }
        public List<BranchOffice> BranchOffices { get; set; }
    }
}