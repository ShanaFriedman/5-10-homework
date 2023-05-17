using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace May10Homework.Data
{
    public class PersonRepository
    {
        private string _connectionString;
        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDbContext(_connectionString);
            return context.People.ToList();
        }
        public void AddPerson(Person p)
        {
            using var context = new PeopleDbContext(_connectionString);
            context.People.Add(p);
            context.SaveChanges();
        }
        public void EditPerson(Person p)
        {
            var context = new PeopleDbContext(_connectionString);
            context.People.Update(p);
            context.SaveChanges();
        }

        public void DeletePerson(Person p)
        {
            var context = new PeopleDbContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {p.Id}");
        }

        public void DeleteMany(List<int> ids)
        {
            var context = new PeopleDbContext(_connectionString);
            foreach (var id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }
        }

    }
}
