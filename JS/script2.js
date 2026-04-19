/* MENU */
function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}

document.querySelectorAll(".service-card").forEach(card => {

  let count = 1;
  const countEl = card.querySelector(".count");
  const plus = card.querySelector(".plus");
  const minus = card.querySelector(".minus");

  plus.addEventListener("click", () => {
    count++;
    countEl.textContent = count;
  });

  minus.addEventListener("click", () => {
    if (count > 1) {
      count--;
      countEl.textContent = count;
    }
  });

});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-cart").forEach(button => {

  button.addEventListener("click", () => {
    const card = button.closest(".service-card");

    const name = card.dataset.name;

    
    const price = Number(card.dataset.price);
    const qty = Number(card.querySelector(".count").textContent);

    const item = { name, price, qty };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart`);
  });

});

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [];
  }

  let found = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].qty++;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("UPDATED CART:", cart);
}

