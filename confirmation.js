document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  const detailsDiv = document.getElementById("order-details");
  if (order && detailsDiv) {
    detailsDiv.innerHTML = `
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Card:</strong> ${order.card}</p>
      <p><strong>Date:</strong> ${order.date}</p>
    `;
    localStorage.removeItem("cart");
  } else if (detailsDiv) {
    detailsDiv.innerHTML = "<p>No order details found.</p>";
  }
});

// ===========Confirmation==============
document.addEventListener("DOMContentLoaded", () => {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  const detailsDiv = document.getElementById("order-details");
  if (order && detailsDiv) {
    detailsDiv.innerHTML = `
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Card:</strong> ${order.card}</p>
      <p><strong>Date:</strong> ${order.date}</p>
    `;
    localStorage.removeItem("cart");
  } else if (detailsDiv) {
    detailsDiv.innerHTML = "<p>No order details found.</p>";
  }

  launchConfetti();
});

function launchConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}
