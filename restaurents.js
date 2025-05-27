gsap.registerPlugin(ScrollTrigger);

// ✅ Locomotive Scroll Setup
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

// Sync Locomotive Scroll with ScrollTrigger
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
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


// ✅ Page Load Animation
gsap.from("#main", {
  opacity: 0,
  duration: 1.2,
  ease: "power2.out"
});


// ✅ Navbar background transition on scroll
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


// ✅ Heading Animations
gsap.utils.toArray("h1").forEach((heading) => {
  gsap.from(heading, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      scroller: "#main",
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
});


// ✅ Smooth Scroll Reveal for Cards
gsap.utils.toArray(".hotel-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    y: 80,
    duration: 1,
    delay: i * 0.05,
    ease: "power4.out",
    scrollTrigger: {
      trigger: card,
      scroller: "#main",
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
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
