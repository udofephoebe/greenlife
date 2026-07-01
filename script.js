document.querySelectorAll('.order-btn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // stop the link from navigating immediately
    const productTitle = link.closest('.product-card').querySelector('h3').textContent;
    showModal(productTitle);
  });
});

function showModal(title){
  const overlay = document.createElement('div');
  overlay.className = 'gl_modal';

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${title}</h3>
    <p>Add to cart or go to order page to complete purchase.</p>
    <div style="display:flex; gap:10px; justify-content:center; margin-top:12px;">
      <button id="gl_addd" class="btn cart ">Add to Cart</button>
      <a href="order.html" class="btn ">Go to Order</a>
      <button id="gl_close" class="btn">Close</button>
    </div>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);



  // Close
  document.getElementById('gl_close').addEventListener('click', () => overlay.remove());

  // Close when clicking outside
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

   document.getElementById('gl_addd').addEventListener('click', () => {
  let cart = JSON.parse(sessionStorage.getItem('gl_cart_items')) || [];
  cart.push({ title: title, quantity: 1 }); // store both title and quantity
  sessionStorage.setItem('gl_cart_items', JSON.stringify(cart));
  overlay.remove(); // close modal
  alert(`${title} added to cart!`); // show confirmation
  updateCartCount(); // refresh counter
});

}





function updateCartCount(){
  const cart = JSON.parse(sessionStorage.getItem('gl_cart_items')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

updateCartCount();
document.addEventListener('DOMContentLoaded', updateCartCount);

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});