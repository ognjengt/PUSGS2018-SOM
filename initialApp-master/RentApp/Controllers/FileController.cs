using RentApp.Persistance.UnitOfWork;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace RentApp.Controllers
{
    [RoutePrefix("api/File")]
    public class FileController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public FileController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [AllowAnonymous]
        [Route("PostImage")]
        public async Task<HttpResponseMessage> PostImage()
        {
            string jwt = Request.Headers.Authorization.Parameter.ToString();
            var decodedToken = unitOfWork.AppUserRepository.DecodeJwt(jwt);

            string userEmail = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            var user = unitOfWork.AppUserRepository.GetAll().ToList().Where(u => u.Email == userEmail).ToList().FirstOrDefault();

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".img", ".jpeg" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png,.img,.jpeg.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {
                            var message = string.Format("Please Upload a file upto 1 mb.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else
                        {
                            if (!Directory.Exists(HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id)))
                                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id));
                            
                            var filePath = HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id + "/profilePic." + postedFile.FileName.Split('.').LastOrDefault());
                            postedFile.SaveAs(filePath);

                            user.Image = "/Content/Images/Users/" + user.Id + "/profilePic." + postedFile.FileName.Split('.').LastOrDefault();
                            var message = string.Format("/Content/Images/" + postedFile.FileName);
                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    //return Request.CreateErrorResponse(HttpStatusCode.Created, message1);
                }

                var res = string.Format("Please Upload a image.");
                //return Request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }

            unitOfWork.AppUserRepository.Update(user);
            unitOfWork.Complete();
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [AllowAnonymous]
        [Route("PostServiceImage")]
        public async Task<HttpResponseMessage> PostServiceImage(string serviceEmail)
        {
            var service = unitOfWork.Services.GetAll().ToList().Where(s => s.Email == serviceEmail).ToList().FirstOrDefault();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".img", ".jpeg" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png,.img,.jpeg.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {
                            var message = string.Format("Please Upload a file upto 1 mb.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else
                        {
                            if (!Directory.Exists(HttpContext.Current.Server.MapPath("/Content/Images/Services/" + service.Id)))
                                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("/Content/Images/Services/" + service.Id));

                            var filePath = HttpContext.Current.Server.MapPath("/Content/Images/Services/" + service.Id + "/serviceLogo." + postedFile.FileName.Split('.').LastOrDefault());
                            postedFile.SaveAs(filePath);

                            service.Logo = "/Content/Images/Services/" + service.Id + "/serviceLogo." + postedFile.FileName.Split('.').LastOrDefault();
                            var message = string.Format("/Content/Images/" + postedFile.FileName);
                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    //return Request.CreateErrorResponse(HttpStatusCode.Created, message1);
                }

                var res = string.Format("Please Upload a image.");
                //return Request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }

            unitOfWork.Services.Update(service);
            unitOfWork.Complete();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [AllowAnonymous]
        [Route("PostBranchImage")]
        public async Task<HttpResponseMessage> PostBranchImage()
        {
            string jwt = Request.Headers.Authorization.Parameter.ToString();
            var decodedToken = unitOfWork.AppUserRepository.DecodeJwt(jwt);

            string userEmail = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            var user = unitOfWork.AppUserRepository.GetAll().ToList().Where(u => u.Email == userEmail).ToList().FirstOrDefault();

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".img", ".jpeg" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png,.img,.jpeg.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {
                            var message = string.Format("Please Upload a file upto 1 mb.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else
                        {
                            if (!Directory.Exists(HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id)))
                                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id));

                            var filePath = HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id + "/profilePic." + postedFile.FileName.Split('.').LastOrDefault());
                            postedFile.SaveAs(filePath);

                            user.Image = "/Content/Images/Users/" + user.Id + "/profilePic." + postedFile.FileName.Split('.').LastOrDefault();
                            var message = string.Format("/Content/Images/" + postedFile.FileName);
                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    //return Request.CreateErrorResponse(HttpStatusCode.Created, message1);
                }

                var res = string.Format("Please Upload a image.");
                //return Request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }

            unitOfWork.AppUserRepository.Update(user);
            unitOfWork.Complete();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [AllowAnonymous]
        [Route("PostVehicleImage")]
        public async Task<HttpResponseMessage> PostVehicleImage()
        {
            string jwt = Request.Headers.Authorization.Parameter.ToString();
            var decodedToken = unitOfWork.AppUserRepository.DecodeJwt(jwt);

            string userEmail = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            var user = unitOfWork.AppUserRepository.GetAll().ToList().Where(u => u.Email == userEmail).ToList().FirstOrDefault();

            Dictionary<string, object> dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                foreach (string file in httpRequest.Files)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {

                        int MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  

                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".img", ".jpeg" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {

                            var message = string.Format("Please Upload image of type .jpg,.gif,.png,.img,.jpeg.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {
                            var message = string.Format("Please Upload a file upto 1 mb.");

                            return Request.CreateResponse(HttpStatusCode.BadRequest, message);
                        }
                        else
                        {
                            if (!Directory.Exists(HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id)))
                                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id));

                            var filePath = HttpContext.Current.Server.MapPath("/Content/Images/Users/" + user.Id + "/profilePic." + postedFile.FileName.Split('.').LastOrDefault());
                            postedFile.SaveAs(filePath);

                            user.Image = "/Content/Images/Users/" + user.Id + "/profilePic." + postedFile.FileName.Split('.').LastOrDefault();
                            var message = string.Format("/Content/Images/" + postedFile.FileName);
                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    //return Request.CreateErrorResponse(HttpStatusCode.Created, message1);
                }

                var res = string.Format("Please Upload a image.");
                //return Request.CreateResponse(HttpStatusCode.NotFound, res);
            }
            catch (Exception)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }

            unitOfWork.AppUserRepository.Update(user);
            unitOfWork.Complete();
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
