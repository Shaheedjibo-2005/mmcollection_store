if(performance.navigation.type === 1){
  sessionStorage.removeItem("cart");
}
/* MENU */
function toggleMenu() {
  document.getElementById("navbar").classList.toggle("active");
}
    // ===== MOBILE VIDEO SLIDER =====
// if (window.innerWidth <= 768) {

//   const mobileVideo = document.getElementById("heroVideo");

//   const mobileVideos = [
//     "videos/VID-20251206-WA0035.mp4",
//     "videos/VID-20251206-WA0034.mp4",
//     "videos/VID-20251206-WA0030.mp4",
//   ];

//   let mobileIndex = 0;

//   mobileVideo.addEventListener("loadeddata", () => {
//     mobileVideo.style.opacity = "1";
//   });

//   setInterval(() => {
//     mobileIndex = (mobileIndex + 1) % mobileVideos.length;
//     mobileVideo.src = mobileVideos[mobileIndex];
//     mobileVideo.load();
//     mobileVideo.play();
//   }, 6000);
// }
const slides = document.querySelectorAll(".slide");

let current = 0;

// play first video
slides[current].play();

setInterval(() => {

  // hide current
  slides[current].classList.remove("active");
  slides[current].pause();

  // next index
  current = (current + 1) % slides.length;

  // show next
  slides[current].classList.add("active");
  slides[current].play();

}, 6000);
/* VIDEO SLIDER */
let slideIndex = 1;
showSlides(slideIndex);

// Next/Prev
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Dot control
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Main function
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Auto slideshow
function showSlidesAuto() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

  setTimeout(showSlidesAuto, 3000); // Change image every 3 seconds
}

// Manual navigation
function plusSlides(n) {
  slideIndex += n - 1; 
  showSlidesAuto();
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlidesAuto();
}

const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let flakes = [];
for (let i = 0; i < 100; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 1 + 0.5
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let flake of flakes) {
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  requestAnimationFrame(update);
}

update();

////

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
// GO TO CHECKOUT
function goToCheckout() {
  window.location.href = "Delivery page.html";
}
function getCart(){
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart){
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){

  let cart = getCart();

  let cartCount = document.getElementsByClassName("cart-count")[0];

  if(cartCount){
    cartCount.textContent = cart.length;
  }
}

function addToCart(name, price, code, event){

  const button = event.target;
  const card = button.closest(".grid");

  let quantity = parseInt(card.querySelector(".count").textContent);

  let image = card.querySelector("img").src;

  let colorSelect = card.querySelector(".color-select");
  let color = colorSelect ? colorSelect.value : "No color";

  let sizeSelect = card.querySelector(".size-select");
  let size = sizeSelect ? sizeSelect.value : "";

  let cart = getCart();
let colors = [];
if(colorSelect){
  colors = Array.from(colorSelect.options).map(opt => opt.value);
}

let sizes = [];
if(sizeSelect){
  sizes = Array.from(sizeSelect.options).map(opt => opt.value);
}
  let existing = cart.find(item =>
    item.code === code &&
    item.color === color &&
    item.size === size
  );

  if(existing){
    existing.quantity += quantity;
  } else {
    cart.push({
      name,
      price,
      code,
      image,
      quantity,
      color,
      size,
      colors,
      sizes
    });
  }
  saveCart(cart);
  updateCartCount();
  flyToCart(button);
  button.innerText = "Added ✓";
  button.style.background = "green";
}
function restoreAddedButtons(){

  let cart = getCart();

  document.querySelectorAll(".grid").forEach(card => {

    let button = card.querySelector(".add-cart");
    let code = button.dataset.code;

    let found = cart.some(item => item.code === code);

    if(found){
      button.innerText = "Added ✓";
      button.style.background = "green";
      button.dataset.added = "true";
    } else {
      button.innerText = "Add to Cart";
      button.style.background = "";
    }

  });

}
document.addEventListener("DOMContentLoaded", function(){
  updateCartCount();
  restoreAddedButtons();
});
function flyToCart(button){

  let card = button.closest(".service-card");
  let img = card.querySelector("img");

  let cartIcon = document.querySelector(".cart-count");

  let clone = img.cloneNode(true);

  let imgRect = img.getBoundingClientRect();
  let cartRect = cartIcon.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.left = imgRect.left + "px";
  clone.style.top = imgRect.top + "px";
  clone.style.width = imgRect.width + "px";
  clone.style.height = imgRect.height + "px";
  clone.style.transition = "all 0.8s ease";
  clone.style.zIndex = "9999";
  clone.style.borderRadius = "10px";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = cartRect.left + "px";
    clone.style.top = cartRect.top + "px";
    clone.style.width = "20px";
    clone.style.height = "20px";
    clone.style.opacity = "0.5";
  }, 50);

  setTimeout(() => {
    clone.remove();

    cartIcon.classList.add("bounce");

    setTimeout(()=>{
      cartIcon.classList.remove("bounce");
    },500);

  }, 900);
}
///bookingform section///--->
document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();

    let overlay = document.getElementById("loadingOverlay");
    overlay.classList.add("active");

    // Get form inputs
let name = document.querySelector("input[type='text']").value;
let phone = document.querySelector("input[type='tel']").value;
let serviceSelect = document.getElementById("serviceSelect");
let service = serviceSelect.value;
let date = document.querySelector("input[type='date']").value;
let message = document.querySelector("textarea").value;

    // Console Debugging service
    console.log("Service: ", service);  
    console.log("Message: ", message);

    let whatsappNumber = "2347038094555"; // whatsapp number in international format without + or 00

    // Construct URL with URL encoding
    let url = "https://wa.me/" + whatsappNumber + 
    "?text=Hello MM Luxury Women Saloon,%0A%0A" +
    "Name: " + encodeURIComponent(name) + "%0A" +
    "Phone: " + encodeURIComponent(phone) + "%0A" +
    "Service: " + encodeURIComponent(service) + "%0A" +
    "Date: " + encodeURIComponent(date) + "%0A" +
    "Message: " + encodeURIComponent(message);

    // Log generated URL for debugging
    console.log("Generated WhatsApp URL: " + url);

    // Delay 3 seconds then success
    setTimeout(function(){
        document.querySelector(".loading-text").innerHTML = "Booking Successful ✔";
        setTimeout(function(){
            overlay.classList.remove("active");
            window.open(url, "_blank");
        },1500);
    },3000);
});

// window.addEventListener("pageshow", function(){

//   let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

//   document.querySelectorAll(".grid").forEach(function(card){

//     let name = card.querySelector("h3").textContent;
//     let button = card.querySelector(".add-cart");

//     let found = cart.find(function(item){
//       return item.name === name;
//     });

//     if(found){
//       button.textContent = "Added ✓";
//       button.style.background = "green";
//       button.disabled = true;
//     }

//   });

// });
//search bar//
document.getElementById("searchInput").addEventListener("keyup", function(){

let search = this.value.toLowerCase();

document.querySelectorAll(".grid").forEach(function(card){

let name = card.querySelector("h3").textContent.toLowerCase();

if(name.includes(search)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});





