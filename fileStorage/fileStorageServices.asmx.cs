using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

// need to talk to mysql
using MySql.Data;
using MySql.Data.MySqlClient;
//and we need this to mainpulate data from a db
using System.Data;

namespace fileStorage
{
    /// <summary>
    /// Summary description for fileStorageServices
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class fileStorageServices : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        public int NumberOfAccounts()
        {
            // grabbing connection string from config file
            string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            // instantiating query
            string sqlSelect = "SELECT * from users";

            // set up our connectino object to be ready to use our connection string
            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            // set up command object to use our connection, and our query
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);

            MySqlDataAdapter sqlDa = new MySqlDataAdapter(sqlCommand);
            DataTable sqlDt = new DataTable();

            sqlDa.Fill(sqlDt);
            return sqlDt.Rows.Count;
        }

        [WebMethod]
        // [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string VerifyCredentials(string username, string password)
        {
            string dbPass = "";

            // grabbing connection string from config file
            string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            // instantiating query
            string sqlSelect = $"Select * FROM users WHERE username='{username}' OR email='{username}'";

            // set up our connectino object to be ready to use our connection string
            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            // set up command object to use our connection, and our query
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);
            sqlConnection.Open();

            // creating a reader that will parse data returned and allow for storage into a variable
            MySqlDataReader reader = sqlCommand.ExecuteReader();

            try
            {
                while (reader.Read())
                {
                    // reading value in specific column "Password"
                    dbPass = (string)reader["Password"];
                }

                // checking to see if password in DB matches password provided
                if (dbPass == password)
                {
                    return reader.GetValue(3).ToString();
                }
                else
                {
                    string var = "false";
                    return var;
                }
            }
            finally
            {
                // terminating reader and DB connections
                reader.Close();
                sqlConnection.Close();
            }
        }

        [WebMethod]
        // [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string classSearch(string input)
        {
            // variable to store HTML string to be appended using JS
            string html = "";
            string id = "";
            string name = "";
            string professor = "";

            // mostly the same code as VerifyCredentials
            string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            // instantiating query
            string sqlSelect = $"Select * FROM classes WHERE ClassID LIKE'%{input}%' OR ProfessorName='{input}' OR ClassName LIKE '%{input}%'";

            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);
            sqlConnection.Open();

            MySqlDataReader reader = sqlCommand.ExecuteReader();

            try
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        id = (string)reader["ClassID"];
                        name = (string)reader["ClassName"];
                        professor = (string)reader["ProfessorName"];

                        html += "<tr><td>" + id + "</td><td>" + name + "</td><td>" + professor + "</td></tr>";
                    }

                    return html;
                }

                else
                {
                    html = null;
                    return html;
                }
            }

            finally
            {
                reader.Close();
                sqlConnection.Close();
            }
        }


        [WebMethod]
        // [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool AddClass(string classID, string className, string professorName)
        {

            // grabbing connection string from config file
            string sqlConnectString = System.Configuration.ConfigurationManager.ConnectionStrings["myDB"].ConnectionString;

            // instantiating query
            string sqlSelect = $"Select * FROM classes WHERE ClassID='{classID}' AND ProfessorName='{professorName}'";

            // set up our connectino object to be ready to use our connection string
            MySqlConnection sqlConnection = new MySqlConnection(sqlConnectString);
            // set up command object to use our connection, and our query
            MySqlCommand sqlCommand = new MySqlCommand(sqlSelect, sqlConnection);
            sqlConnection.Open();

            // checking to see if the class exists in the DB
            MySqlDataReader reader = sqlCommand.ExecuteReader();
            string classExist = "null";

            try
            {
                if (!reader.Read())
                {
                    // closing previous command
                    reader.Close();

                    // instantiating new command
                    MySqlCommand insertClass = new MySqlCommand("INSERT INTO CLASSES(ClassID,ClassName,ProfessorName,Approved) VALUES(@classID,@className,@professorName,@approved)", sqlConnection);

                    // assigning values
                    insertClass.Parameters.AddWithValue("@classID", classID);
                    insertClass.Parameters.AddWithValue("@className", className);
                    insertClass.Parameters.AddWithValue("@professorName", professorName);
                    insertClass.Parameters.AddWithValue("@approved", true);

                    // running command
                    insertClass.ExecuteNonQuery();
                    return true;
                }
                else
                    return false;
            }
            finally
            {
                // terminating DB connections
                sqlConnection.Close();
                reader.Close();
            }
        }
    }
}
