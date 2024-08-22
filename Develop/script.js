// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function () {
  
  //Array of employees
  let employeesArray = []; 

  let keepAsking = true;

  //Loop until the user choses to stop

 while(keepAsking) {

  //Create Employee Object
  const employee = {
    firstName: "", 
    lastName: "",
    salary: 0
  }

  //Ask User for the employee data
  employee.firstName = prompt("Please enter the employee first name");
    while(employee.firstName === null) {
    
      alert("Please put in a name.");
      employee.firstName = prompt("Please enter the employee first name");
    }
  employee.lastName = prompt("Please enter the employee last name");
    while(employee.lastName === null) {
    
      alert("Please put in a name.");
      employee.lastName = prompt("Please enter the employee last name");
    }
  employee.salary = prompt("Please enter the employee salary");
     while(employee.salary === null || isNaN(employee.salary )) {
   
      alert("Please put in a salary.");
      employee.salary = prompt("Please enter the employee salary");
  }   
 
  //Ask if the User wants to input more data
   let ask = window.confirm("Do you want to add another employee?");
  
   if (!ask) { 
      employeesArray.push(employee); 
      keepAsking === false;
      return employeesArray; 
    } else {
      employeesArray.push(employee);
      keepAsking === true; 
    }
  
 }

};

const displayAverageSalary = function (employeesArray) {
  //Calculate and display the average salary

  let sum = 0; 

  //Take in the numbers stored as strings, convert them to floats and add them to the sum
  for (var i = 0; i < employeesArray.length; i++) {
    sum += parseFloat(employeesArray[i].salary);
    console.log(parseFloat(employeesArray[i].salary)); 
  }

  let average = sum/employeesArray.length; 
  console.log(average);
  
  //Make the average salary a number fixed to two decimals 
  let averageSalaryWithTwoDecimals = average.toFixed(2);
  console.log(averageSalaryWithTwoDecimals);
  let numberOfEmployees = employeesArray.length; 

  console.log(`The average employee salary between our ${numberOfEmployees} employee(s) is $${averageSalaryWithTwoDecimals}.`);

  return average; 
};


const getRandomEmployee = function (employeesArray) {
  //  Select and display a random employee
    let selection = Math.floor(Math.random() * employeesArray.length);
    
    let randomEmployeeFirst = employeesArray[selection].firstName;
    let randomEmployeeLast = employeesArray[selection].lastName;

    console.log(`Congratulations to ${randomEmployeeFirst} ${randomEmployeeLast}, our random drawing winner!`); 
    
};

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
