using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fileStorage.Models
{
    public class ClassNote
    {
        private string className;
        private string classCode;
        private string professorName;

        public ClassNote(string className, string classCode, string professorName)
        {
            this.className = className;
            this.classCode = classCode;
            this.professorName = professorName;
        }

        public string ClassName { get => className; set => className = value; }
        public string ClassCode { get => classCode; set => classCode = value; }
        public string ProfessorName { get => professorName; set => professorName = value; }
    }
}