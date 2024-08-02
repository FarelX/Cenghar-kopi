// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector("#hamburger-menu");
const sb = document.querySelector("#search-button");
const sc = document.querySelector("#shopping-cart-button");

document.addEventListener("click", function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    const item = Alpine.store("products").items.find(
      (item) => item.id == e.currentTarget.dataset.id
    );
    Alpine.store("products").showDetails(item);
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  };
});

// klik tombol close modal
document.querySelectorAll(".modal .close-icon").forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    e.target.closest(".modal").style.display = "none";
  };
});

// klik di luar modal
window.onclick = (e) => {
  if (
    e.target === itemDetailModal ||
    e.target === document.querySelector("#invoice-modal")
  ) {
    e.target.style.display = "none";
  }
};

// percobaan
// Function to generate invoice HTML
function generateInvoice(customer, cartItems, total) {
  let invoiceHTML = `
    <p><strong>Invoice #:</strong> ${Math.floor(Math.random() * 100000)}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
    <p><strong>BILLING TO</strong></p>
    <p><strong>${customer.name}</strong></p>
    <p>Contact: ${customer.phone}</p>
    <p>Email: ${customer.email}</p>
    <h3>Item Description</h3>
    <table class="invoice-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Item Description</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>`;

  cartItems.forEach((item, index) => {
    invoiceHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${rupiah(item.price)}</td>
        <td>${rupiah(item.total)}</td>
      </tr>`;
  });

  invoiceHTML += `
      </tbody>
    </table>
    <h3>Total: ${rupiah(total)}</h3>`;

  return invoiceHTML;
}

// Checkout button event listener
document.querySelector("#checkout-button").addEventListener("click", (e) => {
  e.preventDefault();

  const customer = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    phone: document.querySelector("#phone").value,
  };

  const cartItems = Alpine.store("cart").items;
  const total = Alpine.store("cart").total;

  const invoiceDetails = generateInvoice(customer, cartItems, total);
  document.querySelector("#invoice-details").innerHTML = invoiceDetails;

  document.querySelector("#invoice-modal").style.display = "flex";
});

// Close modal event listener
document.querySelectorAll(".modal .close-icon").forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault();
    e.target.closest(".modal").style.display = "none";
  };
});

// Click outside the modal to close it
window.onclick = (e) => {
  if (e.target === document.querySelector("#invoice-modal")) {
    document.querySelector("#invoice-modal").style.display = "none";
  }
};

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Feather icons initialization
feather.replace();
