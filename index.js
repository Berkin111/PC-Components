const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart-close');

cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

const addCartBtns = document.querySelectorAll('.add-cart');

addCartBtns.forEach(button => {
  button.addEventListener('click', event => {
    const productBox = event.target.closest('.product-box');
    addToCart(productBox);
  });
});

const cartContent = document.querySelector('.cart-content');

function addToCart(productBox) {
  const productImgSrc = productBox.querySelector('img').src;
  const productTitle = productBox.querySelector('.product-tit').textContent;
  const productPrice = productBox.querySelector('.price').textContent;

  const cartItem = cartContent.querySelectorAll('.cart-tit')
  for(let item of cartItem) {
  if(item.textContent === productTitle) {
    alert('This item already in the cart');
    return;
  }
}

  const cartBox = document.createElement('div');
  cartBox.classList.add('cart-box');
  cartBox.innerHTML = `
    <img src="${productImgSrc}" alt="">
    <div class="cart-detail">
      <div class="cart-tit">${productTitle}</div>
      <span class="cart-price">${productPrice}</span>
      <div class="cart-quality">
        <button id="dec">-</button>
        <span class="number">1</span>
        <button id="inc">+</button>
      </div>
    </div>
    <i class="ri-delete-bin-line cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector('.cart-remove').addEventListener('click', () => {
    cartBox.remove();

    updateCartCount(-1)
    updateTit();
  });

  cartBox.querySelector('.cart-quality').addEventListener('click', event => {
    const numberElement = cartBox.querySelector('.number');
    const decremBtn = cartBox.querySelector('#dec')
    let quantity = numberElement.textContent;

    if (event.target.id === 'dec' && quantity > 1) {
      quantity--;
      if (quantity === 1) {
        decremBtn.style.color = '#999';
      }
    } else if (event.target.id === 'inc') {
      quantity++;
      decremBtn.style.color = '#333'
    }
    numberElement.textContent = quantity;

    updateTit();
  });
  
  updateCartCount(1)
  
  updateTit();
};
const updateTit = () => {
  const totPriceElement = document.querySelector('.total-price')
  const cartBoxes = cartContent.querySelectorAll('.cart-box')
  let total = 0;
  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector('.cart-price');
    const quantityElement = cartBox.querySelector('.number');
    const price = priceElement.textContent.replace('$', '');
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;

const updateCartCount = change => {
  const cartItemBadge = document.querySelector('.count');
  cartItemCount += change; 

  if (cartItemCount > 0) {
    cartItemBadge.style.visibility = 'visible';
    cartItemBadge.textContent = cartItemCount;
  } else {
    cartItemBadge.style.visibility = 'hidden'; // optional: hide if 0
    cartItemBadge.textContent = '';
  }
}
