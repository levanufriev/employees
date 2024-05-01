using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddEmployeeAsync(Employee employee)
        {
            await _context.Set<Employee>().AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployeeAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        public async Task UpdateEmployeeAsync(int id, Employee model)
        {
            var employeee = await _context.Employees.FindAsync(id);
            if (employeee == null)
            {
                throw new Exception("Employee not found");
            }
            employeee.Name = model.Name;
            employeee.Phone = model.Phone;
            employeee.Age = model.Age;
            employeee.Salary = model.Salary;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsnyc(int id)
        {
            var employeee = await _context.Employees.FindAsync(id);
            if (employeee == null)
            {
                throw new Exception("Employee not found");
            }
            _context.Employees.Remove(employeee);
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetEmployeeByEmail(string email)
        {
            return await _context.Employees.Where(x => x.Email == email).FirstOrDefaultAsync();
        }
    }
}
