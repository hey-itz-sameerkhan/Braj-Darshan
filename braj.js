// ⭐ Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);
history.scrollRestoration = "manual";

// ✅ Initialize Locomotive Scroll
function loco() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

loco();





//⭐ Navbar background transition on scroll
gsap.to("#nav", {
  backgroundColor: "#000",
  duration: 1,
  height: "110px",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "#main",
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
    onEnter: () => document.getElementById("nav").classList.add("scrolled"),
    onLeaveBack: () => document.getElementById("nav").classList.remove("scrolled"),
  },
});



// ✅ Hero Section Load Animations
gsap.from(".luxury-tag", {
  y: 30,
  opacity: 0,
  delay: 2,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".main-heading", {
  y: 80,
  opacity: 0,
  delay: 2.3,
  duration: 1,
  ease: "power4.out",
});

gsap.from(".cover-line", {
  opacity: 0,
  delay: 2.7,
  duration: 1.5,
  ease: "sine.out",
});

gsap.from(".button-group", {
  y: 40,
  opacity: 0,
  delay: 3,
  duration: 1.7,
  ease: "back.out(1.7)",
});





// ✅ Ensure proper sync on mobile and after reloads
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

setTimeout(() => {
  ScrollTrigger.refresh();
}, 500);



// ✅ ABOUT SECTION ANIMATIONS (on enter only)
function runAboutAnimation() {
    // Animate Left Image
    gsap.fromTo(".about-img", {
      scale: 0.7,
      rotateY: 20,
      opacity: 0,
    }, {
      scale: 1,
      rotateY: 0,
      opacity: 1,
      duration: 3.2,  // Increased duration to slow down
      ease: "power4.out",
    });
  
    // Animate Right Section
    gsap.fromTo(".about-right", {
      y: 150,
      opacity: 0,
      rotateZ: 4,
      scale: 0.95,
    }, {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      scale: 1,
      duration: 4,  // Increased duration to slow down
      ease: "expo.out",
    });
  
    // Animate Heading
    gsap.fromTo(".about-right h3", {
      y: 80,
      opacity: 0,
      scale: 0.9,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 2.5,  // Increased duration to slow down
      ease: "bounce.out",
    });
  
    // Animate Paragraphs
    gsap.fromTo(".features p", {
      x: 80,
      opacity: 0,
      scale: 0.8,
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 2.5,  // Increased duration to slow down
      stagger: 0.3,  // Slower stagger
      ease: "back.out(1.7)",
    });
  
    // Animate Button
    gsap.fromTo(".learn-more-btn", {
      scale: 0,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 2.5,  // Increased duration to slow down
      ease: "elastic.out(1, 0.5)",
    });
  }
  
  // 💡 Step 2: Use ScrollTrigger to call the function on scroll entry
  ScrollTrigger.create({
    trigger: "#about-us",
    scroller: "#main",
    start: "top 65%",
    endTrigger: ".learn-more-btn",
    end: "bottom 10%",
    onEnter: runAboutAnimation,
    onEnterBack: runAboutAnimation,
  });
  
  // 💡 Step 3: Ensure the animations play properly during scroll
  ScrollTrigger.create({
    trigger: ".about-left", // ya section wrapper
    scroller: "#main",
    start: "top 65%",
    end: "bottom 10%",
    onEnter: () => runAboutAnimation(),
    onEnterBack: () => runAboutAnimation(),
    onLeave: () => runAboutAnimation(),
    onLeaveBack: () => runAboutAnimation(),
  });
  

  // ✅ Special Tour Section Animation
function runDestinationsAnimation() {
  gsap.fromTo(".left-content", 
    { x: -100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 2, ease: "power2.out" }
  );

  gsap.fromTo(".right-cards", 
    { x: 100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 2, ease: "power2.out" }
  );
}

ScrollTrigger.create({
  trigger: ".destinations",
  scroller: "#main",
  start: "top 55%",
  end: "bottom 30%",
  onEnter: () => runDestinationsAnimation(),
  onEnterBack: () => runDestinationsAnimation(),
  onLeave: () => runDestinationsAnimation(),
  onLeaveBack: () => runDestinationsAnimation(),
});



// ✅ Smooth Scroll for Attractions (Infinite Scroll)
const container = document.getElementById("attraction-scroll");
  const dotsContainer = document.getElementById("carousel-dots");

  function scrollAttractions(direction) {
    const cardWidth = container.children[0].offsetWidth + 24;
    container.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  function updateDots() {
    const cards = container.querySelectorAll(".attraction-card");
    const scrollLeft = container.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 24;
    const index = Math.round(scrollLeft / cardWidth);

    const dots = dotsContainer.querySelectorAll("span");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  function createDots() {
    const cards = container.querySelectorAll(".attraction-card");
    dotsContainer.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });
  }

  container.addEventListener("scroll", () => {
    updateDots();
  });

  window.addEventListener("load", () => {
    createDots();
  });



// ✅ Parallax 3D Hover Effect on About Image
const aboutImg = document.querySelector('.about-img');
aboutImg.addEventListener('mousemove', (e) => {
  const bounds = aboutImg.getBoundingClientRect();
  const x = e.clientX - bounds.left;
  const y = e.clientY - bounds.top;
  const centerX = bounds.width / 2;
  const centerY = bounds.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * -10;

  aboutImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  aboutImg.style.transition = `transform 0.2s ease`;
});

aboutImg.addEventListener('mouseleave', () => {
  aboutImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});





//💻 ✅ Smooth Scroll for gem - section 

const gemsContainer = document.getElementById("gems-scroll");
const gemsDotsContainer = document.getElementById("gems-dots");

// Scroll function
function scrollGems(direction) {
  const cardWidth = gemsContainer.children[0].offsetWidth + 24;
  gemsContainer.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
}

// Dot update on scroll
function updateGemsDots() {
  const cards = gemsContainer.querySelectorAll(".gem-card");
  const scrollLeft = gemsContainer.scrollLeft;
  const cardWidth = cards[0].offsetWidth + 24;
  const index = Math.round(scrollLeft / cardWidth);

  const dots = gemsDotsContainer.querySelectorAll("span");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

// Dot creation
function createGemsDots() {
  const cards = gemsContainer.querySelectorAll(".gem-card");
  gemsDotsContainer.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    gemsDotsContainer.appendChild(dot);
  });
}

gemsContainer.addEventListener("scroll", updateGemsDots);
window.addEventListener("load", createGemsDots);



// 🚀 Travel Diaries Auto Scroll

const scrollContainer = document.getElementById('scrollContainer');

// Clone only for desktop
if (window.innerWidth > 768) {
  scrollContainer.innerHTML += scrollContainer.innerHTML;
}

let animationFrameId;
let isScrolling = true;

function autoScroll() {
  if (!isScrolling || window.innerWidth <= 768) return;

  scrollContainer.scrollLeft += 2.5;
  if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
    scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
  }

  animationFrameId = requestAnimationFrame(autoScroll);
}

function startAutoScroll() {
  isScrolling = true;
  cancelAnimationFrame(animationFrameId);
  autoScroll();
}

function stopAutoScroll() {
  isScrolling = false;
  cancelAnimationFrame(animationFrameId);
}

// Desktop-only drag to scroll
if (window.innerWidth > 768) {
  let isDown = false, startX, scrollLeft;

  scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.classList.add('active');
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    stopAutoScroll();
  });

  scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
    setTimeout(startAutoScroll, 2000);
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });

  scrollContainer.addEventListener('mouseenter', stopAutoScroll);
  scrollContainer.addEventListener('mouseleave', startAutoScroll);
  scrollContainer.addEventListener('wheel', () => {
    stopAutoScroll();
    clearTimeout(window.resumeScrollTimeout);
    window.resumeScrollTimeout = setTimeout(startAutoScroll, 3000);
  });

  startAutoScroll();
}

// 👉 Mobile Pagination Dots for Diaries
function setupDiaryDots() {
  const cards = document.querySelectorAll(".diary-card");
  const dotsContainer = document.getElementById("diaryDots");

  // Skip if not mobile
  if (window.innerWidth > 768 || !dotsContainer) return;

  dotsContainer.innerHTML = "";
  cards.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const updateActiveDot = () => {
    const scrollX = scrollContainer.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 20; // including gap
    const index = Math.round(scrollX / cardWidth);
    const dots = dotsContainer.querySelectorAll(".dot");

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  };

  scrollContainer.addEventListener("scroll", () => {
    requestAnimationFrame(updateActiveDot);
  });
}

// Run on load
window.addEventListener("load", setupDiaryDots);
window.addEventListener("resize", setupDiaryDots);






// 💫 Preloader Logic
window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");
  // fade out with gsap
  gsap.to(loader, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => loader.style.display = "none"
  });
});




// ✅ FOOTER CTA SECTION ANIMATIONS
function runFooterCTAAnimation() {
  gsap.fromTo(".footer-left", 
    { scale: 0.8, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 2.5, ease: "bounce.out" }
  );

  gsap.fromTo(".footer-right", 
    { scale: 0.8, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 2.5, ease: "bounce.out", delay: 0.2 }
  );
}

ScrollTrigger.create({
  trigger: ".footer-cta",
  scroller: "#main",
  start: "top 70%",
  end: "bottom 30%",
  onEnter: () => runFooterCTAAnimation(),
  onEnterBack: () => runFooterCTAAnimation(),
  onLeave: () => runFooterCTAAnimation(),
  onLeaveBack: () => runFooterCTAAnimation(),
});


// ✅ Page 4 Heading Animation
gsap.from("#page4 h1", {
  y: 50,
  scrollTrigger: {
    trigger: "#page4 h1",
    scroller: "#main",
    start: "top 75%",
    end: "top 70%",
    scrub: 6
  },
});


const backendURL = "https://braj-backend.onrender.com";

// ✅ Booking Modal Controls (Final Fixed)
const modal = document.getElementById("booking-modal");
const startButtons = document.querySelectorAll('a[href="#plan"], .start-btn');
const closeBtn = modal.querySelector(".close-btn");

function openModal() {
  modal.style.display = "flex";
  document.getElementById("main").style.pointerEvents = "none"; // 🚫 Prevent background scroll/interaction
}

function closeModal() {
  modal.style.display = "none";
  document.getElementById("main").style.pointerEvents = "auto"; // ✅ Re-enable interaction/scroll
}

// Open modal on "Start Planning" button click
startButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });
});

// Close modal on "×" button
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Close modal on ESC key
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});


// Booking Form Submit Handler
document.getElementById("booking-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  closeModal();

  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = `<div class="loader"></div>`;
  document.body.appendChild(loader);
  loader.offsetHeight;

  const form = this;
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    package: form.package.value,
    message: form.message.value.trim(),
    date: form.date.value,
  };

  try {
    const res = await fetch(`${backendURL}/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    loader.remove();

    if (!res.ok || !data.success) {
      showConfirmationCard(false);
      return;
    }

    showConfirmationCard(true, formData.name, formData.package);
    form.reset();

  } catch {
    loader.remove();
    showConfirmationCard(false);
  }
});

function showConfirmationCard(success, name = "", packageName = "") {
  const card = document.createElement("div");
  card.className = "confirmation-card";
  card.innerHTML = success
    ? `
      <button class="close-card" onclick="this.parentElement.remove()">×</button>
      <h2 style="color: rgb(59, 250, 16);">🎉 Booking Confirmed!</h2>
      <p>Dear ${name}, your <strong>${packageName}</strong> has been booked successfully!<br><br>
      You’ll receive confirmation Email<br>
      (<font color="#fdd835">Sometimes, emails may land in the spam folder, so please do check there as well to ensure you don’t miss it!</font>)<br>
      <strong>Jai Shri Radhe! 🌸</strong></p>
    `
    : `
      <button class="close-card" onclick="this.parentElement.remove()">×</button>
      <h2 style="color: #e53935;">❌ Booking Failed</h2>
      <p>Oops! Something went wrong while submitting your booking.<br><br>
      Please try again later.<br><br>
      You can also <a href="https://wa.me/919068446055" target="_blank" style="color:#fff; font-weight:bold;">WhatsApp the Founder</a> directly.<br><br>
      <strong>We're here to help you! 🙏</strong></p>
    `;
  document.body.appendChild(card);
}



// 🍔 Toggle Mobile Menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.add("show");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
});

window.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove("show");
  }
});

// ✅ Restrict booking form date input to today and future only
window.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.querySelector('#booking-form input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});

window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");

  // Wait a short moment for smoother transition (especially on deploy)
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.7,
      ease: "power1.out",
      onComplete: () => {
        loader.style.display = "none";
        document.body.style.overflow = "visible"; // restore scroll
      }
    });
  }, 500); // Delay ensures all assets fully render
});



