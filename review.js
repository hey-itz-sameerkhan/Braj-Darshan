gsap.registerPlugin(ScrollTrigger);

// Locomotive Scroll
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
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


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



// 🌟 Review Cards Load Animation
const cards = document.querySelectorAll('.review-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.animation = 'fadeInUp 1s ease forwards';
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  observer.observe(card);
});


cards.forEach((card, index) => {
  observer.observe(card);
  card.style.animationDelay = `${index * 0.2}s`;
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
