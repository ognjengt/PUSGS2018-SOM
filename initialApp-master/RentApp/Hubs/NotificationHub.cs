using System;
using System.Linq;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace RentApp.Hubs
{
    [HubName("notifications")]
    public class NotificationHub : Hub
    {
        public void NotifyAdmin()
        {
            Clients.Caller.sendNotification("New user created, waiting for evaluation.");
        }
    }
}