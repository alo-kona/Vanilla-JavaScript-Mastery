// --- 1. STATE MANAGEMENT ---
let employeeData = [];
let currentlyEditingIndex = null;

// --- 2. DOM ELEMENTS ---
const employeeTableBody = document.getElementById('employeeTableBody');
const addEmployeeForm = document.getElementById('add-employee-form');
const nameInput = document.getElementById('name-input');
const positionInput = document.getElementById('position-input');
const departmentInput = document.getElementById('department-input');

// --- 3. DYNAMIC STYLING CONFIGURATION ---
const STYLES = {
  row: 'hover:bg-gray-100 h-12', // নির্দিষ্ট হাইট যোগ করা হয়েছে যেন রো লাফিয়ে না ওঠে
  baseCell: 'border px-4 py-2 text-sm text-gray-800 align-middle',
  inputCell: 'border p-1 align-middle', // প্যাডিং কমানো হয়েছে যেন ইনপুট ফিট হয়
  inputField:
    'w-full px-2 py-1 border rounded text-sm focus:outline-blue-500 bg-white',
  button:
    'text-white px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition-opacity inline-block',
  btnColors: {
    save: 'bg-green-500 mr-1',
    cancel: 'bg-gray-400',
    edit: 'bg-yellow-500 mr-1',
    delete: 'bg-red-500',
  },
};

// --- 4. MODULAR HELPER FUNCTIONS ---

// Dynamic Cell Creator
const createCell = (text = '', extraClass = '') => {
  const cell = document.createElement('td');
  cell.className = `${STYLES.baseCell} ${extraClass}`.trim();
  cell.textContent = text;
  return cell;
};

// Dynamic Input Cell Creator
const createInputCell = (value) => {
  const cell = document.createElement('td');
  cell.className = STYLES.inputCell;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.className = STYLES.inputField;

  cell.appendChild(input);
  return cell;
};

// Dynamic Button Creator
const createButton = (text, type, onClick) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = `${STYLES.button} ${STYLES.btnColors[type] || ''}`.trim();
  button.addEventListener('click', onClick);
  return button;
};

// --- 5. RENDER LOGIC COMPONENTS ---

// Save & Cancel Actions
const renderEditActions = (index, dataCells, employeeKeys) => {
  const saveBtn = createButton('Save', 'save', () => {
    let isValid = true;

    const updatedEmployee = employeeKeys.reduce((acc, key, idx) => {
      const inputValue = dataCells[idx].querySelector('input').value.trim();
      if (!inputValue) isValid = false;
      acc[key] = inputValue;
      return acc;
    }, {});

    if (!isValid) {
      alert('Please fill out all fields before saving.');
      return;
    }

    employeeData[index] = updatedEmployee;
    currentlyEditingIndex = null;
    renderEmployeeData();
  });

  const cancelBtn = createButton('Cancel', 'cancel', () => {
    currentlyEditingIndex = null;
    renderEmployeeData();
  });

  const actionsCell = createCell('', 'text-center');
  actionsCell.append(saveBtn, cancelBtn);
  return actionsCell;
};

// Edit & Delete Actions
const renderDisplayActions = (index) => {
  const editBtn = createButton('Edit', 'edit', () => {
    currentlyEditingIndex = index;
    renderEmployeeData();
  });

  const deleteBtn = createButton('Delete', 'delete', () => {
    employeeData.splice(index, 1);
    renderEmployeeData();
  });

  const actionsCell = createCell('', 'text-center');
  actionsCell.append(editBtn, deleteBtn);
  return actionsCell;
};

// --- 6. CORE RENDER FUNCTION ---

const renderEmployeeData = () => {
  employeeTableBody.textContent = '';

  const tableRows = employeeData.map((employee, index) => {
    const row = document.createElement('tr');
    row.className = STYLES.row;

    // 1. Serial/ID Cell
    const idCell = createCell(index + 1, 'text-center font-semibold');

    // 2. Dynamic Data Cells
    const employeeKeys = ['name', 'position', 'department'];

    const dataCells = employeeKeys.map((key) =>
      index === currentlyEditingIndex
        ? createInputCell(employee[key])
        : createCell(employee[key]),
    );

    // 3. Dynamic Action Cell
    const actionsCell =
      index === currentlyEditingIndex
        ? renderEditActions(index, dataCells, employeeKeys)
        : renderDisplayActions(index);

    // 4. Append All Cells to Row
    row.append(idCell, ...dataCells, actionsCell);
    return row;
  });

  employeeTableBody.append(...tableRows);
};

// --- 7. EVENT LISTENERS ---

addEmployeeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newEmployee = {
    name: nameInput.value.trim(),
    position: positionInput.value.trim(),
    department: departmentInput.value.trim(),
  };

  employeeData.push(newEmployee);
  addEmployeeForm.reset();
  renderEmployeeData();
});

// --- 8. INITIAL RENDER ---
renderEmployeeData();
