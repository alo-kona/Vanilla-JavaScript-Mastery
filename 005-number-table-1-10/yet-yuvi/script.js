const generateBtn = document.getElementById('generate');
const topRow = document.getElementById('top-row');
const bottomRow = document.getElementById('bottom-row');

const TABLE_CLASS = 'table-auto border border-slate-700 w-full';
const CELL_CLASS = 'border border-slate-300 p-2 text-center hover:bg-gray-100';

// Click event
generateBtn.addEventListener('click', function () {
  clearTable();

  for (let num = 1; num <= 10; num++) {
    const table = generateTable(num);

    if (num <= 5) {
      topRow.appendChild(table);
    } else {
      bottomRow.appendChild(table);
    }
  }
});

// generate row
const generateRow = ({ num, rowNo }) => {
  const cells = [];
  const rowData = [num, ' x ', rowNo, ' = ', num * rowNo];

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

// generate table
function generateTable(number) {
  const table = document.createElement('table');
  table.className = TABLE_CLASS;
  const tableBody = document.createElement('tbody');
  for (let rowNum = 1; rowNum <= 10; rowNum++) {
    const tRow = generateRow({ num: number, rowNo: rowNum });
    tableBody.appendChild(tRow);
  }
  table.appendChild(tableBody);
  return table;
}

// clearing table after one operation
function clearTable() {
  topRow.innerHTML = '';
  bottomRow.innerHTML = '';
}
