using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentApp.Models.Entities
{
    public class Rent
    {
        public string Id { get; set; }
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
        public BranchOffice BranchOffice { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}