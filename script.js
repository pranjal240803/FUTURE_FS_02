console.log('Script loaded!');

document.addEventListener("DOMContentLoaded", function () {
  // ======== MOBILE MENU =========
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const closeMenuBtn = document.getElementById('close-menu');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  if (mobileMenuBtn && closeMenuBtn && mobileMenu && menuOverlay) {
    mobileMenuBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close when clicking any link inside the mobile menu
    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ======== CART =========
  let cart = [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCartBtn = document.getElementById('close-cart');

  function openCart() {
    cartSidebar.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartSidebar.classList.add('translate-x-full');
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  if (cartBtn && closeCartBtn && cartSidebar && cartOverlay) {
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
  }

  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCart();
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      const existingItem = cart.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id, name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();

      showToast(`${name} added to cart!`);
    });
  });

  function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2000);
}


  function updateCart() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h4 class="font-bold">${item.name}</h4>
            <p class="text-gray-600">₹${item.price.toFixed(2)} x ${item.quantity}</p>
          </div>
          <div class="flex items-center">
            <span class="font-bold mr-4">₹${(item.price * item.quantity).toFixed(2)}</span>
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

    let totalCount = 0;
    cart.forEach(item => {
      totalCount += item.quantity;
    });

    if (cartCount) {
      cartCount.textContent = totalCount;
      if (totalCount > 0) {
        cartCount.classList.remove('hidden');
      } else {
        cartCount.classList.add('hidden');
      }
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `₹${subtotal.toFixed(2)}`;
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  const continueShoppingBtn = document.getElementById('continue-shopping');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      closeCart();
    });
  }
});

// ======== ABOUT BACKGROUND =========
document.addEventListener("DOMContentLoaded", function () {
  const bg = document.getElementById('about-bg');
  const images = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg'
  ];
  let current = 0;

  function changeBackground() {
    bg.style.opacity = 0;
    setTimeout(() => {
      bg.style.backgroundImage = `url('${images[current]}')`;
      bg.style.opacity = 1;
      current = (current + 1) % images.length;
    }, 1000);
  }

  bg.style.backgroundImage = `url('${images[current]}')`;
  current = (current + 1) % images.length;

  setInterval(changeBackground, 5000);
});

// ======== TESTIMONIAL FLIP =========
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.testimonial-container');
  let isFlipped = false;

  setInterval(() => {
    isFlipped = !isFlipped;
    container.classList.toggle('flipped', isFlipped);
  }, 5000);

  container.addEventListener('click', () => {
    isFlipped = !isFlipped;
    container.classList.toggle('flipped', isFlipped);
  });
});

// ======== CATEGORY FILTER =========
document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-category');
      categoryButtons.forEach(btn => {
        btn.classList.remove('bg-amber-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-800');
      });
      button.classList.add('bg-amber-600', 'text-white');
      button.classList.remove('bg-gray-200', 'text-gray-800');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
