// ⭐ Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ✅ Initialize Locomotive Scroll
function loco() {
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
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
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
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

// 🎯 Animate contact section on scroll
gsap.from(".contact-section", {
  scrollTrigger: {
    trigger: ".contact-section",
    scroller: "#main",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 50,
  duration: 3,
  ease: "power2.out",
});

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

const backendURL = "https://braj-backend.onrender.com"; // ✅ Your live backend

// 🎯 Simple Popup Message Function
function showPopupMessage(message, isError = false) {
  const popup = document.getElementById("popupMsg");
  popup.textContent = message;
  popup.style.background = isError ? "#f44336" : "#4caf50";
  popup.style.opacity = "1";
  popup.style.pointerEvents = "auto";

  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.pointerEvents = "none";
  }, 4000);
}

// 📨 Contact Form Submit Handler
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const loader = document.getElementById("contact-loader");
  const confirmationCard = document.querySelector(".contact-confirm-card");
  const cardContent = confirmationCard.querySelector(".card-content");
  const closeIcon = confirmationCard.querySelector(".contact-confirm-close");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loader and hide confirmation
    loader.style.display = "flex";
    confirmationCard.style.display = "none";

    const formData = {
      services: Array.from(contactForm.querySelectorAll('input[name="service"]:checked')).map(cb => cb.value),
      firstName: contactForm.querySelector('[name="firstName"]').value.trim(),
      lastName: contactForm.querySelector('[name="lastName"]').value.trim(),
      email: contactForm.querySelector('[name="email"]').value.trim(),
      phone: contactForm.querySelector('[name="phone"]').value.trim(),
      message: contactForm.querySelector('[name="message"]').value.trim(),
    };

    try {
      const response = await fetch(`${backendURL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      loader.style.display = "none";

      if (response.ok) {
        cardContent.innerHTML = `✅ Your message has been sent successfully! We will contact you soon.`;
        confirmationCard.classList.remove("error");
        confirmationCard.classList.add("success");
        contactForm.reset();
      } else {
        cardContent.innerHTML = `❌ Sorry, your message could not be sent. Please try again.`;
        confirmationCard.classList.remove("success");
        confirmationCard.classList.add("error");
      }

      confirmationCard.style.display = "flex";

    } catch (error) {
      loader.style.display = "none";
      cardContent.innerHTML = `❌ Network error. Please check your internet connection and try again.`;
      confirmationCard.classList.remove("success");
      confirmationCard.classList.add("error");
      confirmationCard.style.display = "flex";
    }
  });

  closeIcon.addEventListener("click", () => {
    confirmationCard.style.display = "none";
  });
});
