using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

// need to talk to mysql
using MySql.Data;
using MySql.Data.MySqlClient;
//and we need this to mainpulate data from a db
using System.Data;

namespace fileStorage.Controllers
{
    public class FileUploadController : ApiController
    {
        [HttpPost]
        public string[] UploadFiles()
        {
            HttpFileCollection files = HttpContext.Current.Request.Files;
            string[] path = new string[files.Count];
            string classInfo = this.Request.Headers.Referrer.Query;
            string[] classInfoChars = classInfo.Split('_');
            string classID = classInfoChars[0].Split('=')[1];
            string professorName = classInfoChars[1];

            for(var i = 0; i < files.Count; i++)
            {
                HttpPostedFile file = files[i];
                string rootPath = "~/data/" + file.FileName;
                path[i] = rootPath.Substring(1);
                file.SaveAs(HttpContext.Current.Server.MapPath(rootPath));

                // grabbing connection string from config file
                string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

                // instantiating query
                string sqlSelect = $"Select * FROM notes WHERE ClassID='{classID}' AND ProfessorName='{professorName}'";

                // set up our connectino object to be ready to use our connection string
                MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
                // set up command object to use our connection, and our query
                MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);
                sqlConnection.Open();

                // checking to see if the class exists in the DB
                MySqlDataReader reader = sqlCommand.ExecuteReader();

                try
                {
                    if (!reader.Read())
                    {
                        // closing previous command
                        reader.Close();

                        // instantiating new command
                        MySqlCommand insertNote = new MySqlCommand("INSERT INTO NOTES(ClassID,ProfessorName,NotePath) VALUES(@classID,@professorName,@notePath)", sqlConnection);

                        // assigning values
                        insertNote.Parameters.AddWithValue("@classID", classID);
                        insertNote.Parameters.AddWithValue("@professorName", professorName);
                        insertNote.Parameters.AddWithValue("@notePath", path[0]);

                        // running command
                        insertNote.ExecuteNonQuery();
                    }
                }
                finally
                {
                    // terminating DB connections
                    sqlConnection.Close();
                    reader.Close();
                }
            }

            return path;
        }
    }
}
