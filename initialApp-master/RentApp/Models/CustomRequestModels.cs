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

    public class ReviewRequestModel
    {
        public int Id { get; set; }
        public string User { get; set; }
        public DateTime? DatePosted { get; set; }
        public string Comment { get; set; }
        public int Stars { get; set; }
        public int ServiceId { get; set; }
    }
}