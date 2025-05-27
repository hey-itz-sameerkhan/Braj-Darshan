// 🌀 Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ✅ Initialize Locomotive Scroll
function initScroll() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  scroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0, left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  ScrollTrigger.refresh();
}
initScroll();

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



// 🔮 Scroll-based fade-in animation
gsap.utils.toArray(".fade-in").forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 2.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        scroller: "#main",
        start: "top 85%",
        toggleActions: "play none none reset"
      }
    }
  );
});


// 🌟 Animate Mission Text and Stats on Scroll
gsap.from(".mission-text", {
  scrollTrigger: {
    trigger: ".mission-text",
    scroller: "#main",
    start: "top 85%",
    toggleActions: "play none none reset"
  },
  opacity: 0,
  y: 50,
  duration: 2,
  ease: "power2.out"
});

gsap.from(".mission-images", {
  scrollTrigger: {
    trigger: ".mission-images",
    scroller: "#main",
    start: "top 85%",
    toggleActions: "play none none reset"
  },
  opacity: 0,
  x: 60,
  duration: 2,
  ease: "power2.out"
});

gsap.utils.toArray(".stat-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      scroller: "#main",
      start: "top 90%",
      toggleActions: "play none none reset"
    },
    opacity: 0,
    scale: 0.8,
    duration: 0.6 + i * 0.1,
    ease: "back.out(1.7)"
  });
});


// 🌟 Review Cards Animation (uncomment + improve)
gsap.from(".review-card", {
  scrollTrigger: {
    trigger: "#reviews",
    scroller: "#main",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  opacity: 1,
  y: 50,
  duration: 1.2,
  ease: "power4.out",
  stagger: 0.2
});


gsap.from(".review-heading", {
  scrollTrigger: {
    trigger: ".review-heading",
    scroller: "#main",
    start: "top 85%",
  },
  y: 50,
  opacity: 1,
  duration: 1.2,
  ease: "power4.out"
});

// ♾️ Seamless infinite loop of review cards
const track = document.querySelector('.review-track-container');
track.innerHTML += track.innerHTML; // Duplicate all review cards for smooth infinite animation

// Get all review cards
const reviewCards = document.querySelectorAll('.review-card');

// Pause animation on hover of review card and resume when hover is removed
reviewCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused'; // Pause animation
  });

  card.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running'; // Resume animation
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
