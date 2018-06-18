using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace RentApp.Persistance.Repository
{
    public class AppUserRepository : Repository<AppUser, int>, IAppUserRepository
    {
        public AppUserRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<AppUser> GetAll(int pageIndex, int pageSize)
        {
            return Context.AppUsers.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }

        // Vraca sve menadzere koji nisu banovani
        public IEnumerable<AppUser> GetUnbannedManagers()
        {
            return new List<AppUser>() { new AppUser() { FullName = "Onaj koji nije banovan" }, new AppUser() { FullName = "Onaj koji nije banovan 2" } };
        }

        // Vraca sve menadzere koji su banovani
        public IEnumerable<AppUser> GetBannedManagers()
        {
            return new List<AppUser>() { new AppUser() { FullName = "Banovan menadzer 1" } };
        }

        // Vraca sve usere koji cekaju odobrenje naloga
        public IEnumerable<AppUser> GetAwaitingClients()
        {
            return new List<AppUser>() { new AppUser() { FullName = "Klijent Kojicekapotvrdu1"}, new AppUser() { FullName = "Klijent Kojicekapotvrdu2" } };
        }

        protected RADBContext Context { get { return RADBContext.Create(); } }
    }
}