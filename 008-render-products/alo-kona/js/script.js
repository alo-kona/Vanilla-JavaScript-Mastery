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

// 2. Creates and renders product rows into the HTML table body
const renderProductTable = (products) => {
  productTableBody.innerHTML = '';

  const productTableRows = products.map((product, index) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-100 transition-colors';

    // SL No.
    const serialCol = document.createElement('td');
    serialCol.innerText = index + 1;
    serialCol.className = 'border px-4 py-2';

    // Name
    const nameCol = document.createElement('td');
    nameCol.innerText = product.name;
    nameCol.className = 'border px-4 py-2 capitalize';

    // Price
    const priceCol = document.createElement('td');
    priceCol.innerText = `$${product.price.toFixed(2)}`;
    priceCol.className = 'border px-4 py-2';

    // Image
    const imageCol = document.createElement('td');
    imageCol.className = 'border px-4 py-2';

    const img = document.createElement('img');
    img.src = `assets/images/${product.image}`;
    img.alt = product.name;
    img.className = 'w-full h-20 object-cover rounded';
    img.loading = 'lazy'; // Optimizes performance
    img.onerror = () => {
      img.alt = 'Image not available'; // Fallback if image fails to load
    };
    imageCol.appendChild(img);

    // Type
    const typeCol = document.createElement('td');
    typeCol.innerText = product.type;
    typeCol.className = 'border px-4 py-2 capitalize';

    // Append cells to the row in exact order
    row.append(serialCol, nameCol, priceCol, imageCol, typeCol);
    return row;
  });

  // Single DOM operation to append all rows for maximum performance
  productTableBody.append(...productTableRows);
};

// 3. Main controller function to handle loading state and render flow
const renderProducts = async () => {
  loadingComponent.innerText = 'Loading products, please wait...';

  try {
    const products = await getProducts();
    renderProductTable(products);
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to load products. Please check your internet connection.');
  } finally {
    loadingComponent.innerText = '';
  }
};

renderProducts();
