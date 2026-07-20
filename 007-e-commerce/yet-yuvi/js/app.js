const products = [
  {
    id: 1,
    name: 'Gaming Laptop',
    price: 1500,
    image: './assets/images/product-placeholder.webp',
    categories: ['Laptops', 'Gaming'],
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 50,
    image: './assets/images/product-placeholder.webp',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 3,
    name: 'Mechanical Keyboard',
    price: 100,
    image: './assets/images/product-placeholder.webp',
    categories: ['Accessories', 'Peripherals'],
  },
  {
    id: 4,
    name: 'External Hard Drive',
    price: 120,
    image: './assets/images/product-placeholder.webp',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 5,
    name: 'Graphics Card',
    price: 500,
    image: './assets/images/product-placeholder.webp',
    categories: ['Components', 'Gaming'],
  },
  {
    id: 6,
    name: 'Portable SSD',
    price: 200,
    image: './assets/images/product-placeholder.webp',
    categories: ['Storage', 'Accessories'],
  },
  {
    id: 7,
    name: 'Gaming Monitor',
    price: 300,
    image: './assets/images/product-placeholder.webp',
    categories: ['Monitors', 'Gaming'],
  },
  {
    id: 8,
    name: 'All-in-One Printer',
    price: 150,
    image: './assets/images/product-placeholder.webp',
    categories: ['Peripherals', 'Printers'],
  },
];

const productGrid = document.getElementById('product-grid');
const cartList = document.getElementById('cart-items');
const totalPriceComponent = document.getElementById('total-price');
const categoryContainer = document.getElementById('category-filters');
const applyFiltersBtn = document.getElementById('apply-filters-btn');
const clearFiltersBtn = document.getElementById('clear-filters-btn');

//////////////////////////////////
const CART_KEY = 'e-commerce-cart';

const saveCartItemsToLocalStorage = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getCartItemsFromLocalStorage = () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY));
    return cartItems ? cartItems : [];
  } catch (error) {
    console.error(
      'There was an error parsing the cart items from local storage:',
      error,
    );
    return [];
  }
};

const cart = getCartItemsFromLocalStorage();

const addProductToCart = (product) => {
  const productIndexInCart = cart.findIndex((item) => item.id === product.id);
  if (productIndexInCart === -1) {
    cart.push({
      ...product,
      quantity: 1,
    });
    return;
  }
  cart[productIndexInCart] = {
    ...cart[productIndexInCart],
    quantity: cart[productIndexInCart].quantity + 1,
  };
};

const removeCartItem = (productId) => {
  const cartItemIndex = cart.findIndex((cartItem) => cartItem.id === productId);
  if (cartItemIndex === -1) {
    alert(`This item doesn't exist in the cart!!`);
    return;
  }
  if (cart[cartItemIndex].quantity > 1) {
    cart[cartItemIndex] = {
      ...cart[cartItemIndex],
      quantity: cart[cartItemIndex].quantity - 1,
    };
    renderCart(cart);
    return;
  }
  if (confirm('Are you sure?')) {
    cart.splice(cartItemIndex, 1);
    renderCart(cart);
  }
};

const getRemoveFromCartBtn = (productId) => {
  const removeFromCartBtn = document.createElement('button');
  removeFromCartBtn.className =
    'bg-gray-200 text-red-500 hover:bg-red-500 hover:text-white px-1 rounded ml-2';
  removeFromCartBtn.textContent = 'Remove';
  removeFromCartBtn.addEventListener('click', () => {
    removeCartItem(productId);
  });
  return removeFromCartBtn;
};

const getCartListItem = (cartItem) => {
  const cartListItem = document.createElement('li');
  cartListItem.textContent = `${cartItem.name} x${cartItem.quantity} $${cartItem.price * cartItem.quantity}`;
  const removeFromCartBtn = getRemoveFromCartBtn(cartItem.id);
  cartListItem.appendChild(removeFromCartBtn);
  return cartListItem;
};

const renderCart = (cart) => {
  const cartListItems = cart.map((cartItem) => {
    const cartListItem = getCartListItem(cartItem);
    return cartListItem;
  });

  cartList.innerHTML = '';
  cartList.append(...cartListItems);

  const totalPrice = cart.reduce((acc, currItem) => {
    return acc + currItem.price * currItem.quantity;
  }, 0);
  totalPriceComponent.textContent = `Total: $${totalPrice.toFixed(2)}`;

  saveCartItemsToLocalStorage(cart);
};
//////////////////////////////////

//////////////////////////////////
const getProductImageComponent = (product) => {
  const productImageComponent = document.createElement('img');
  productImageComponent.src = product.image;
  productImageComponent.alt = product.name;
  productImageComponent.className = 'w-full mb-4 object-cover rounded';
  return productImageComponent;
};

const getProductNameComponent = (productName) => {
  const productNameComponent = document.createElement('h3');
  productNameComponent.className = 'text-lg font-semibold mb-2';
  productNameComponent.textContent = productName;
  return productNameComponent;
};

const getProductPriceComponent = (productPrice) => {
  const productPriceComponent = document.createElement('p');
  productPriceComponent.className = 'text-gray-700';
  productPriceComponent.textContent = `$${productPrice}`;
  return productPriceComponent;
};

const getAddToCartBtnComponent = (product) => {
  const addToCartBtn = document.createElement('button');
  addToCartBtn.className =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded mt-2';
  addToCartBtn.textContent = 'Add to Cart';
  addToCartBtn.addEventListener('click', () => {
    addProductToCart(product);
    renderCart(cart);
  });
  return addToCartBtn;
};

const getProductCard = (product) => {
  const productCard = document.createElement('div');
  productCard.className = 'bg-white p-4 rounded shadow';

  const productImageComponent = getProductImageComponent(product);
  const productNameComponent = getProductNameComponent(product.name);
  const productPriceComponent = getProductPriceComponent(product.price);
  const addToCartBtn = getAddToCartBtnComponent(product);

  productCard.append(
    productImageComponent,
    productNameComponent,
    productPriceComponent,
    addToCartBtn,
  );

  return productCard;
};
////////////////////////////////

////////////////////////////////
const FILTER_KEY = 'e-commerce-filter';

const saveFiltersToLocalStorage = (filters) => {
  localStorage.setItem(FILTER_KEY, JSON.stringify(filters));
};

const getFiltersFromLocalStorage = () => {
  const savedFilters = JSON.parse(localStorage.getItem(FILTER_KEY));
  if (!savedFilters) {
    return [];
  }
  return savedFilters;
};

let appliedFilters = getFiltersFromLocalStorage();
let filters = [...appliedFilters];

const getCategoryBtn = (categoryName) => {
  const categoryBtn = document.createElement('button');
  categoryBtn.className =
    'font-semibold py-2 px-4 rounded mr-2 mb-2 transition-colors duration-150';
  categoryBtn.innerText = categoryName;

  const updateButtonStyles = () => {
    if (filters.includes(categoryName)) {
      categoryBtn.classList.add(
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
      );
      categoryBtn.classList.remove(
        'bg-gray-200',
        'text-gray-800',
        'hover:bg-gray-300',
      );
    } else {
      categoryBtn.classList.add(
        'bg-gray-200',
        'text-gray-800',
        'hover:bg-gray-300',
      );
      categoryBtn.classList.remove(
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
      );
    }
  };

  updateButtonStyles();

  categoryBtn.addEventListener('click', () => {
    const filterIndex = filters.findIndex((filter) => filter === categoryName);
    if (filterIndex === -1) {
      filters.push(categoryName);
    } else {
      filters.splice(filterIndex, 1);
    }
    updateButtonStyles();
  });
  return categoryBtn;
};

const renderCategories = (products) => {
  const categories = Array.from(
    new Set(products.map((product) => product.categories).flat()),
  );

  const categoryBtns = categories.map((category) => {
    const categoryBtn = getCategoryBtn(category);
    return categoryBtn;
  });

  categoryContainer.innerHTML = '';
  categoryContainer.append(...categoryBtns);
};

applyFiltersBtn.addEventListener('click', () => {
  appliedFilters = [...filters];
  saveFiltersToLocalStorage(appliedFilters);
  renderProducts(products);
});

clearFiltersBtn.addEventListener('click', () => {
  filters = [];
  appliedFilters = [];
  saveFiltersToLocalStorage(appliedFilters);
  renderCategories(products);
  renderProducts(products);
});
///////////////////////////////

///////////////////////////////
const renderProducts = (products) => {
  let filteredProducts = [...products];

  if (appliedFilters.length > 0) {
    filteredProducts = products.filter((product) => {
      if (
        product.categories.some((category) => appliedFilters.includes(category))
      ) {
        return true;
      }
      return false;
    });
  }

  const productCards = filteredProducts.map((product) => {
    const productCard = getProductCard(product);
    return productCard;
  });

  productGrid.innerHTML = '';
  productGrid.append(...productCards);
};
///////////////////////////////

renderProducts(products);
renderCart(cart);
renderCategories(products);
