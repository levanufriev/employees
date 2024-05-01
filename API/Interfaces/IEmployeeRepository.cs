using API.Models;

namespace API.Interfaces
{
    public interface IEmployeeRepository
    {
        Task AddEmployeeAsync(Employee employee);
        Task<List<Employee>> GetAllEmployeeAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task UpdateEmployeeAsync(int id, Employee model);
        Task DeleteEmployeeAsnyc(int id);
        Task<Employee> GetEmployeeByEmail(string email);
    }
}
