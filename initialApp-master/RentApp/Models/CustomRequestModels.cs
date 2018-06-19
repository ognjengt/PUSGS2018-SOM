using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models
{

    public class BranchOfficeRequestModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public string Logo { get; set; }
        public string Address { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public int ServiceId { get; set; }
    }
}