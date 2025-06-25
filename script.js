// Cart functionality
let cart = [];
let cartCount = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  cartCount++;
  updateCartDisplay();
  showNotification(`${name} added to cart!`);
}

function updateCartDisplay() {
  document.getElementById("cartCount").textContent = cartCount;

  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                    <button onclick="removeFromCart(${index})" style="background: #ff4757; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 5px; cursor: pointer;">Remove</button>
                `;
    cartItems.appendChild(cartItem);
  });

  document.getElementById("cartTotal").textContent = `Total: $${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  cartCount--;
  updateCartDisplay();
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }
  showNotification("Thank you for your purchase!");
  cart = [];
  cartCount = 0;
  updateCartDisplay();
  closeCart();
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");
  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Close cart modal when clicking outside
document.getElementById("cartModal").addEventListener("click", (e) => {
  if (e.target.id === "cartModal") {
    closeCart();
  }
});
