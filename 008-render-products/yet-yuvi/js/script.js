const url =
  'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json';

const loadingComponent = document.getElementById('loading-text');
const productTableBody = document.getElementById('productTableBody');

// 1. Safely fetches product data from the API
const getProducts = async () => {
  const productResponse = await fetch(url);

  if (!productResponse.ok) {
    throw new Error(`HTTP Error! Status: ${productResponse.status}`);
  }

  return await productResponse.json();
};

// 2. Create product rows
const createProductRows = (products) => {
  productTableBody.innerHTML = '';

  const productTableRows = products.map((product, index) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-100 transition-colors';

    // SL No.
    const serialCol = document.createElement('td');
    serialCol.innerText = index + 1;
    serialCol.className = 'border px-4 py-2 text-center font-semibold';

    // Name
    const nameCol = document.createElement('td');
    nameCol.innerText = product.name;
    nameCol.className = 'border px-4 py-2 capitalize';

    // Price
    const priceCol = document.createElement('td');
    priceCol.innerText = `$${product.price.toFixed(2)}`;
    priceCol.className = 'border px-4 py-2 font-semibold text-green-600';

    // Image
    const imageCol = document.createElement('td');
    imageCol.className = 'border px-4 py-2 text-center';

    const img = document.createElement('img');
    img.src = `assets/images/${product.image}`;
    img.alt = product.name;
    img.className = 'w-24 h-12 object-cover mx-auto rounded shadow-sm';
    img.loading = 'lazy';

    // Image fallback handling
    img.onerror = () => {
      imageCol.innerText = 'No Image';
      imageCol.className += ' text-xs text-gray-400 italic';
    };
    imageCol.appendChild(img);

    // Type
    const typeCol = document.createElement('td');
    typeCol.innerText = product.type;
    typeCol.className = 'border px-4 py-2 capitalize';

    // Append all columns to the row
    row.append(serialCol, nameCol, priceCol, imageCol, typeCol);
    return row;
  });

  // Append all rows to the table body at once
  productTableBody.append(...productTableRows);
};

// 3. Main controller function
const renderProducts = async () => {
  loadingComponent.innerText = 'Loading products, please wait...';

  try {
    const products = await getProducts();
    createProductRows(products);
  } catch (error) {
    console.error('Error fetching data:', error);

    // Friendly UI message for fetch errors
    productTableBody.innerHTML = '';
    const errorRow = document.createElement('tr');
    const errorCol = document.createElement('td');

    errorCol.colSpan = 5;
    errorCol.innerText = 'Failed to load products. Please try again later.';
    errorCol.className = 'text-center py-4 text-red-500 font-medium border';

    errorRow.appendChild(errorCol);
    productTableBody.appendChild(errorRow);
  } finally {
    loadingComponent.innerText = '';
  }
};

renderProducts();
