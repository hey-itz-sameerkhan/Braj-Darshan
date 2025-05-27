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



// GSAP Animation
gsap.from(".login-form-container", {
  opacity: 0,
  y: 100,
  duration: 1,
  ease: "power4.out"
});

// Typing Effect
const textArray = ["Welcome Back!", "Login to Continue"];
let typingText = document.getElementById('typing-text');
let arrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[arrayIndex].length) {
    typingText.textContent += textArray[arrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(() => {
      typingText.textContent = '';
      arrayIndex = (arrayIndex + 1) % textArray.length;
      charIndex = 0;
      type();
    }, 2000);
  }
}
type();

// Form Validation + Cute Shake
// document.getElementById('loginForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const email = e.target.email.value.trim();
//   const password = e.target.password.value.trim();
  
//   if (!email || !password) {
//     e.target.classList.add('shake');
//     setTimeout(() => {
//       e.target.classList.remove('shake');
//     }, 400);
//     alert("Please fill all fields!");
//   } else {
//     alert("Login Successful!");
//     e.target.reset();
//   }
// });



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



document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});


    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token); // ✅ token save
      alert('Login Successful! Welcome ' + data.user.name);
      window.location.href = "/dashboard.html"; // ✅ redirect to dashboard
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Server error, try again later.');
  }
});
