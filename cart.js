function getCart(){
  const raw = localStorage.getItem("pmp_cart");
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart){
  localStorage.setItem("pmp_cart", JSON.stringify(cart));
  updateCartCount();
}

function addItemToCart(item){
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({...item, qty: 1});
  }
  saveCart(cart);
}

function removeItemFromCart(id){
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function updateCartCount(){
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

function renderCart(){
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty. <a href=\"index.html\">Browse templates</a>.</p>";
    if (totalEl) totalEl.textContent = "$0";
    return;
  }
  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `<div class="cart-row">
      <span>${item.name}</span>
      <span>Qty: ${item.qty}</span>
      <span>$${item.price * item.qty}</span>
      <button class="btn-remove" onclick="removeItemFromCart('${item.id}')">Remove</button>
    </div>`;
  }).join("");
  if (totalEl) totalEl.textContent = "$" + total;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
