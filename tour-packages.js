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



//  // ✅ Universal Scroll Animation for all sections
// document.querySelectorAll("section").forEach((sec, index) => {
//   gsap.from(sec, {
//     opacity: 0,
//     y: 100,
//     duration: 2,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: sec,
//       scroller: "#main",
//       start: "top 65%",
//       toggleActions: "play none none reverse",
//     },
//   });
// });


// ✅ Universal Scroll Animation for all sections
document.querySelectorAll("section").forEach((sec, index) => {
  gsap.from(sec, {
    opacity: 0,
    y: 100,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sec,
      scroller: "#main",  // Ensure #main is your scroll container
      start: "top 75%",   // Adjust this value to trigger earlier or later
      end: "bottom 10%",  // You can also define an end point
      toggleActions: "play none none reverse", // Control play/reverse actions
      // markers: true, // Optional: Shows markers for debugging
    },
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
