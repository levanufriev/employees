using API.Controllers;
using API.Interfaces;
using API.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Tests.Controllers
{
    public class EmployeeControllerTests
    {
        [Fact]
        public void EmployeeController_GetEmployeeList_ReturnsOk()
        {
            var mock = new Mock<IEmployeeRepository>();
            mock.Setup(repo => repo.GetAllEmployeeAsync()).Returns(GetTestEmployees());
            var controller = new EmployeeController(mock.Object);

            var result = controller.GetEmployeeList();

            result.Should().NotBeNull();
            result.Should().BeOfType(typeof(OkObjectResult));
        }

        private async Task<List<Employee>> GetTestEmployees()
        {
            var users = new List<Employee>
            {
                new Employee {
                    Id=1,
                    Name="Employee1",
                    Email="Employee1@gmail.com",
                    Phone="112233",
                    Age=20,
                    Salary=20
                    },
                new Employee {
                    Id=2,
                    Name="Employee2",
                    Email="Employee2@gmail.com",
                    Phone="332211",
                    Age=30,
                    Salary=30
                    },
            };
            return users;
        }
    }
}
