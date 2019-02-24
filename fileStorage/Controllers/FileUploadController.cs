using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace fileStorage.Controllers
{
    public class FileUploadController : ApiController
    {
        [HttpPost]
        public string[] UploadFiles()
        {
            HttpFileCollection files = HttpContext.Current.Request.Files;
            string[] path = new string[files.Count];

            for(var i = 0; i < files.Count; i++)
            {
                HttpPostedFile file = files[i];
                string rootPath = "~/data/" + file.FileName;
                path[i] = rootPath.Substring(1);
                file.SaveAs(HttpContext.Current.Server.MapPath(rootPath));
            }

            return path;
        }
    }
}
