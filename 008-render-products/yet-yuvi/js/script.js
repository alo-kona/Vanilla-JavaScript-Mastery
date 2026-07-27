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

// 2. Simply renders serial number and product name in table rows using document.createElement
const renderProductList = (products) => {
  productTableBody.innerHTML = '';

  const productTableRows = products.map((product, index) => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-100';

    const serialCol = document.createElement('td');
    serialCol.innerText = index + 1;
    serialCol.className = 'border px-4 py-2 font-semibold';

    const nameCol = document.createElement('td');
    nameCol.innerText = product.name;
    nameCol.className = 'border px-4 py-2 capitalize';

    const priceCol = document.createElement('td');
    priceCol.innerText = '-';
    priceCol.className = 'border px-4 py-2 text-center';

    const imageCol = document.createElement('td');
    imageCol.innerText = '-';
    imageCol.className = 'border px-4 py-2 text-center';

    const typeCol = document.createElement('td');
    typeCol.innerText = '-';
    typeCol.className = 'border px-4 py-2 text-center';

    row.append(serialCol, nameCol, priceCol, imageCol, typeCol);

    return row;
  });

  productTableBody.append(...productTableRows);
};

// 3. Main controller function
const renderProducts = async () => {
  loadingComponent.innerText = 'Loading products, please wait...';

  try {
    const products = await getProducts();
    renderProductList(products);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loadingComponent.innerText = '';
  }
};

renderProducts();
