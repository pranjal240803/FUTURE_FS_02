document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  const loginLink = document.getElementById('login-link');
  const profileIcon = document.getElementById('profile-icon');

  // Check if user is already logged in
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    if (loginLink) loginLink.classList.add('hidden');
    if (profileIcon) profileIcon.classList.remove('hidden');
  } else {
    if (loginLink) loginLink.classList.remove('hidden');
    if (profileIcon) profileIcon.classList.add('hidden');
  }

  // Switch to Login
  loginTab?.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginTab.classList.add('text-[#4b2c20]', 'font-semibold', 'border-b-2', 'border-amber-500');
    registerTab.classList.remove('text-[#4b2c20]', 'font-semibold', 'border-b-2', 'border-amber-500');
    registerTab.classList.add('text-gray-500');
  });

  // Switch to Register
  registerTab?.addEventListener('click', () => {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerTab.classList.add('text-[#4b2c20]', 'font-semibold', 'border-b-2', 'border-amber-500');
    loginTab.classList.remove('text-[#4b2c20]', 'font-semibold', 'border-b-2', 'border-amber-500');
    loginTab.classList.add('text-gray-500');
  });

  // Register handler
  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (name && email && password) {
      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      showToast(`Account created for ${name}! You can now log in.`);
      loginTab.click();
    }
  });

  // Login handler
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      showToast(`Welcome back, ${savedUser.name}!`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showToast('Invalid email or password. Please try again.');
    }
  });

  // Logout on profile icon click
  profileIcon?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = "index.html";
  });
});

// Toast message function
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast) return;

  toastMessage.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
