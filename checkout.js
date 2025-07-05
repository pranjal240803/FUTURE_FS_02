document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkout-form");

  form?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const card = document.getElementById("card");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const addressError = document.getElementById("address-error");
    const cardError = document.getElementById("card-error");
    let valid = true;

    if (name.value.trim() === "") {
      nameError.classList.remove("hidden");
      valid = false;
    } else {
      nameError.classList.add("hidden");
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
      emailError.classList.remove("hidden");
      valid = false;
    } else {
      emailError.classList.add("hidden");
    }

    if (address.value.trim() === "") {
      addressError.classList.remove("hidden");
      valid = false;
    } else {
      addressError.classList.add("hidden");
    }

    const cardPattern = /^\d{16}$/;
    if (!cardPattern.test(card.value.trim())) {
      cardError.classList.remove("hidden");
      valid = false;
    } else {
      cardError.classList.add("hidden");
    }

    if (valid) {
      const order = {
        name: name.value.trim(),
        email: email.value.trim(),
        address: address.value.trim(),
        card: "**** **** **** " + card.value.slice(-4),
        date: new Date().toLocaleString(),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      simulatePayment();
    }
  });

  function simulatePayment() {
    const overlay = document.createElement("div");
    overlay.id = "payment-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";
    overlay.innerHTML = `<div class="bg-white p-6 rounded shadow text-center">
      <p class="text-lg mb-4">Processing Payment...</p>
      <div class="loader border-4 border-amber-600 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto"></div>
    </div>`;

    document.body.appendChild(overlay);

    setTimeout(() => {
      document.body.removeChild(overlay);
      window.location.href = "confirmation.html";
    }, 2500);
  }
});