
const products = [
  
  // ======= Cakes =======
  { id: '1', name: 'Chocolate Cake', description: 'Rich and moist chocolate cake.', price: 699, image: 'images/p1.jpg' },
  { id: '2', name: 'Vanilla Cake', description: 'Light and fluffy vanilla cake.', price: 599, image: 'images/p2.jpg' },
  { id: '3', name: 'Red Velvet Cake', description: 'Classic red velvet with cream cheese frosting.', price: 749, image: 'images/p3.jpg' },
  { id: '4', name: 'Strawberry Cake', description: 'Fresh strawberry layered cake.', price: 899, image: 'images/p4.jpg' },
  { id: '5', name: 'Black Forest Cake', description: 'Chocolate and cherry delight.', price: 799, image: 'images/p5.jpg' },
  { id: '6', name: 'Carrot Cake', description: 'Moist carrot cake with creamy frosting.', price: 599, image: 'images/p6.jpg' },

  // ======= Cookies =======
  { id: '7', name: 'Chocolate Chip Cookie', description: 'Classic chewy chocolate chip cookies.', price: 79, image: 'images/p7.jpg' },
  { id: '8', name: 'Oatmeal Raisin Cookie', description: 'Chewy and wholesome oatmeal raisin.', price: 89, image: 'images/p8.jpg' },
  { id: '9', name: 'Peanut Butter Cookie', description: 'Rich and soft peanut butter cookies.', price: 75, image: 'images/p9.jpg' },
  { id: '10', name: 'Macadamia Nut Cookie', description: 'Buttery cookie with crunchy macadamia nuts.', price: 99, image: 'images/p10.jpg' },
  { id: '11', name: 'Double Chocolate Cookie', description: 'Intensely chocolate, soft and fudgy.', price: 99, image: 'images/p11.jpg' },
  { id: '12', name: 'Sugar Cookie', description: 'Soft, buttery sugar cookie with sprinkles.', price: 59, image: 'images/p12.jpg' },

  // ======= Breads =======
  { id: '13', name: 'Sourdough Bread', description: 'Artisan crusty sourdough loaf.', price: 249, image: 'images/p13.jpg' },
  { id: '14', name: 'Baguette', description: 'French style crisp baguette.', price: 149, image: 'images/p14.jpg' },
  { id: '15', name: 'Whole Wheat Bread', description: 'Healthy, hearty whole wheat loaf.', price: 199, image: 'images/p15.jpg' },
  { id: '16', name: 'Brioche', description: 'Soft, buttery French brioche.', price: 299, image: 'images/p16.jpg' },
  { id: '17', name: 'Ciabatta', description: 'Italian rustic bread with airy crumb.', price: 249, image: 'images/p17.jpg' },
  { id: '18', name: 'Focaccia', description: 'Olive oil infused Italian focaccia.', price: 299, image: 'images/p18.jpg' },

  // ======= Pastries =======
  { id: '19', name: 'Croissant', description: 'Flaky, buttery French croissant.', price: 149, image: 'images/p19.jpg' },
  { id: '20', name: 'Danish', description: 'Sweet pastry with fruit filling.', price: 149, image: 'images/p20.jpg' },
  { id: '21', name: 'Eclair', description: 'Light choux pastry with cream filling.', price: 169, image: 'images/p21.jpg' },
  { id: '22', name: 'Fruit Tart', description: 'Fresh seasonal fruit on creamy base.', price: 249, image: 'images/p22.jpg' },
  { id: '23', name: 'Cinnamon Roll', description: 'Sweet cinnamon swirl with icing.', price: 149, image: 'images/p23.jpg' },
  { id: '24', name: 'Baklava', description: 'Layered filo pastry with nuts and honey.', price: 199, image: 'images/p24.jpg' },

  // ======= Featured Treats =======
  { id: '25', name: 'Strawberry Delight', description: 'Fresh strawberries and cream in a fluffy sponge.', price: 499, image: 'images/p25.jpg' },
  { id: '26', name: 'Honey Almond Tart', description: 'Crunchy tart with honey glaze and toasted almonds.', price: 549, image: 'images/p26.jpg' },
  { id: '27', name: 'Mini Lemon Cheesecake', description: 'Creamy cheesecake with lemon zest on a cookie base.', price: 249, image: 'images/p27.jpg' },
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const product = products.find(p => p.id === productId);

if (product) {
  document.getElementById('product-name').innerText = product.name;
  document.getElementById('product-description').innerText = product.description;
  document.getElementById('product-price').innerText = `₹${product.price}`;
  document.getElementById('product-image').src = product.image;
} else {
  document.querySelector('section').innerHTML = '<p class="text-center text-xl text-red-500">Product not found!</p>';
}

// ====== Quantity Control ======
let quantity = 1;
const increaseBtn = document.getElementById('increaseQty');
const decreaseBtn = document.getElementById('decreaseQty');
const quantityInput = document.getElementById('quantity');
const addToCartBtn = document.getElementById('addToCart');

increaseBtn.addEventListener('click', () => {
  quantity++;
  quantityInput.value = quantity;
});

decreaseBtn.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    quantityInput.value = quantity;
  }
});

// ====== Add to Cart Logic ======
addToCartBtn.addEventListener('click', () => {
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
 
  const toast = document.createElement('div');
toast.textContent = `${product.name} (x${quantity}) added to cart!`;
toast.className = "fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow z-50";
document.body.appendChild(toast);

// Remove it after 3 seconds
setTimeout(() => {
  toast.remove();
}, 3000);

quantity = 1;
quantityInput.value = quantity;
});

// ====== Render & Update Cart ======
function updateCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  if (!cartItemsContainer || !cartSubtotal || !cartTotal || !cartCount) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h4 class="font-bold">${item.name}</h4>
          <p class="text-gray-600">${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="flex items-center">
          <span class="font-bold mr-4">${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-item text-red-500 hover:text-red-700" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      });
    });
  }

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;
  cartCount.classList.toggle('hidden', totalCount === 0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  cartTotal.textContent = `₹${subtotal.toFixed(2)}`;
}

// ====== Cart Sidebar Open/Close ======
const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const closeCartBtn = document.getElementById("close-cart");

cartBtn?.addEventListener("click", () => {
  updateCart();
  cartSidebar.classList.remove("translate-x-full");
  cartOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

closeCartBtn?.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  cartOverlay.classList.add("hidden");
  document.body.style.overflow = "auto";
});

cartOverlay?.addEventListener("click", () => {
  cartSidebar.classList.add("translate-x-full");
  cartOverlay.classList.add("hidden");
  document.body.style.overflow = "auto";
});

// Load cart data on page load
updateCart();