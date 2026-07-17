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
  cart[productIndexInCart].quantity++;
};

const getCartListItem = (cartItem) => {
  const cartListItem = document.createElement('li');
  cartListItem.textContent = `${cartItem.name} x${cartItem.quantity} $${(cartItem.price * cartItem.quantity).toFixed(2)}`;
  return cartListItem;
};

const renderCart = (cart) => {
  const cartListItems = cart.map((cartItem) => {
    const cartListItem = getCartListItem(cartItem);
    return cartListItem;
  });

  cartList.innerHTML = '';
  cartList.append(...cartListItems);
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

const renderProducts = (products) => {
  const productCards = products.map((product) => {
    const productCard = getProductCard(product);
    return productCard;
  });
  productGrid.innerHTML = '';
  productGrid.append(...productCards);
};

renderProducts(products);
renderCart(cart);
