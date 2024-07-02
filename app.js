import inquirer from 'inquirer';
class Employee {
    id;
    name;
    salary;
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
}
class EmployeeService {
    employees = [];
    addEmployee(employee) {
        this.employees.push(employee);
    }
    deleteEmployee(id) {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }
    updateEmployee(id, name, salary) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            if (name)
                employee.name = name;
            if (salary)
                employee.salary = salary;
        }
        else {
            console.log(`Employee with ID ${id} not found.`);
        }
    }
    getEmployees() {
        return this.employees;
    }
}
const employeeService = new EmployeeService();
async function main() {
    let continueLoop = true;
    while (continueLoop) {
        const { action } = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add Employee', 'Delete Employee', 'Update Employee', 'View Employees', 'Exit'],
        });
        switch (action) {
            case 'Add Employee':
                const { count } = await inquirer.prompt({
                    name: 'count',
                    type: 'number',
                    message: 'How many employees do you want to add?',
                });
                for (let i = 0; i < count; i++) {
                    const { id, name, salary } = await inquirer.prompt([
                        {
                            name: 'id',
                            type: 'number',
                            message: `Enter ID for employee ${i + 1}:`
                        },
                        {
                            name: 'name',
                            type: 'input',
                            message: `Enter name for employee ${i + 1}:`
                        },
                        {
                            name: 'salary',
                            type: 'number',
                            message: `Enter salary for employee ${i + 1}:`
                        }
                    ]);
                    const employee = new Employee(id, name, salary);
                    employeeService.addEmployee(employee);
                }
                break;
            case 'Delete Employee':
                const { deleteId } = await inquirer.prompt({
                    name: 'deleteId',
                    type: 'number',
                    message: 'Enter the ID of the employee you want to delete:'
                });
                console.log("Employee deleted succesfully");
                employeeService.deleteEmployee(deleteId);
                break;
            case 'Update Employee':
                const { updateId, updateName, updateSalary } = await inquirer.prompt([
                    {
                        name: 'updateId',
                        type: 'number',
                        message: 'Enter the ID of the employee you want to update:'
                    },
                    {
                        name: 'updateName',
                        type: 'input',
                        message: 'Enter the new name:',
                        default: null
                    },
                    {
                        name: 'updateSalary',
                        type: 'number',
                        message: 'Enter the new salary:',
                        default: null
                    }
                ]);
                employeeService.updateEmployee(updateId, updateName, updateSalary);
                break;
            case 'View Employees':
                console.log('Current Employees:', employeeService.getEmployees());
                break;
            case 'Exit':
                continueLoop = false;
                break;
            default:
                break;
        }
    }
}
main();
