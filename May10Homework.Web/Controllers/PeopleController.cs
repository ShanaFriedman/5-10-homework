using May10Homework.Data;
using May10Homework.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace May10Homework.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAllPeople()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(p);
        }

        [HttpPost]
        [Route("delete")]
        public void DeletePerson(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeletePerson(p);
        }

        [HttpPost]
        [Route("edit")]
        public void EditPerson(Person p)
        {
            var repo = new PersonRepository(_connectionString);
            repo.EditPerson(p);
        }

        [HttpPost]
        [Route("deletemany")]
        public void DeleteMany(DeleteManyModel model)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteMany(model.ids);
        }

    }
}
