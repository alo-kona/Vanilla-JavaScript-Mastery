// An array of employee objects.
const employeeData = [
  {
    id: 1,
    name: 'Shoaib Akhtar',
    position: 'Fast Bowler',
    department: 'Cricket',
  },
  {
    id: 2,
    name: 'Virat Kohli',
    position: 'Batsman',
    department: 'Cricket',
  },
  {
    id: 3,
    name: 'M.S. Dhoni',
    position: 'Wicketkeeper',
    department: 'Cricket',
  },
  {
    id: 4,
    name: 'Shaid Afridi',
    position: 'All-rounder',
    department: 'Cricket',
  },
  {
    id: 5,
    name: 'brett lee',
    position: 'Fast Bowler',
    department: 'Cricket',
  },
  {
    id: 6,
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Engineering',
  },
  {
    id: 7,
    name: 'Jane Smith',
    position: 'Product Manager',
    department: 'Product',
  },
  {
    id: 8,
    name: 'Sam Johnson',
    position: 'Designer',
    department: 'Design',
  },
  {
    id: 9,
    name: 'Chris Lee',
    position: 'Data Scientist',
    department: 'Data',
  },
];

// Get the <tbody> element from the HTML.
const employeeTableBody = document.getElementById('employeeTableBody');

// Global configuration for table styling using Tailwind CSS classes.
const ROW_CLASS = 'hover:bg-gray-100';
const CELL_CLASS = 'border px-4 py-2';

// Creates a single table row (<tr>) for one employee.
const getEmployeeRow = (employee) => {
  const columnNames = Object.keys(employee);

  const columns = columnNames.map((columnName) => {
    const column = document.createElement('td');
    column.className = CELL_CLASS;
    column.innerText = employee[columnName];
    return column;
  });

  const employeeRow = document.createElement('tr');
  employeeRow.className = ROW_CLASS;
  employeeRow.append(...columns);

  return employeeRow;
};

// Renders all employees into the HTML table body.
const renderEmployeeData = (employees) => {
  employees.forEach((employee) => {
    const employeeRow = getEmployeeRow(employee);
    employeeTableBody.appendChild(employeeRow);
  });
};

// Calls the function to build the table on page load.
renderEmployeeData(employeeData);
