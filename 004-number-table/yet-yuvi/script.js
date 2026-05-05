const numberInput = document.getElementById('input-number');
const generateBtn = document.getElementById('generate');
const tableBody = document.getElementById('table-body');

const CELL_CLASS = 'border border-slate-300 p-2 text-center hover:bg-gray-100';

generateBtn.addEventListener('click', () => {
  const num = parseInt(numberInput.value);
  if (isNaN(num)) {
    alert('Please enter a valid number.');
    return;
  }
  cleanTable();
  generateTable(num);
});

const cleanTable = () => (tableBody.innerHTML = '');
const generateTable = (num) => {
  for (let rowNo = 1; rowNo <= 10; rowNo++) {
    const tableRow = generateRow({ input: num, rowNo });
    tableBody.appendChild(tableRow);
  }
};

const generateRow = ({ input, rowNo }) => {
  const cells = [];
  const rowData = [input, ' x ', rowNo, ' = ', input * rowNo];

  rowData.forEach((data) => {
    const cell = document.createElement('td');
    cell.innerText = data;
    cell.className = CELL_CLASS;
    cells.push(cell);
  });

  const tableRow = document.createElement('tr');
  tableRow.append(...cells);
  return tableRow;
};
