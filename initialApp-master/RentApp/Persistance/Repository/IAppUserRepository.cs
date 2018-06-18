using RentApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentApp.Persistance.Repository
{
    public interface IAppUserRepository : IRepository<AppUser, int>
    {
        IEnumerable<AppUser> GetAll(int pageIndex, int pageSize);
        IEnumerable<AppUser> GetUnbannedManagers();
        IEnumerable<AppUser> GetBannedManagers();
        IEnumerable<AppUser> GetAwaitingClients();
        AppUser GetUser(int Id);
    }
}
