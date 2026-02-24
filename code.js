/* HEADER */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});

/* SLIDER */
const slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");

  if (current === 0) slide1Typing();
  if (current === 1) slide2Typing();
}, 12000);

/* SLIDE 1 TYPING */
function slide1Typing() {
  const small = document.getElementById("line-small");
  const big1 = document.getElementById("line-big-1");
  const big2 = document.getElementById("line-big-2");

  small.textContent = "";
  big1.textContent = "";
  big2.textContent = "";

  const textSmall = "We Are Expert In";
  const textBig1 = "BUSINESS SOLUTION AND";
  const textBig2 = "FREE COOPERATION";

  let i = 0;
  const t1 = setInterval(() => {
    small.textContent += textSmall[i++];
    if (i === textSmall.length) clearInterval(t1);
  }, 90);

  setTimeout(() => {
    let j = 0;
    const t2 = setInterval(() => {
      big1.textContent += textBig1[j++];
      if (j === textBig1.length) clearInterval(t2);
    }, 60);
  }, 1600);

  setTimeout(() => {
    let k = 0;
    const t3 = setInterval(() => {
      big2.textContent += textBig2[k++];
      if (k === textBig2.length) clearInterval(t3);
    }, 60);
  }, 3200);
}

/* SLIDE 2 (بدون تغییر منطقی) */
function slide2Typing() {
    const center = document.getElementById("type-center");
    const desc = document.getElementById("type-desc");

  const mainText = "Smart Solutions For Your Business";
  const descriptions = [
    "We provide complete and modern business solutions for companies worldwide.",
    "Our expert team helps your business grow faster with reliable strategies."
  ];

  center.textContent = "";
  desc.textContent = "";
  
  let i = 0;
  const mainType = setInterval(() => {
      center.textContent += mainText[i++];
    if (i === mainText.length) clearInterval(mainType);
  }, 70);

  let d = 0;
  setTimeout(() => typeDesc(), 2500);

  function typeDesc() {
      desc.textContent = "";
      let j = 0;
    const txt = descriptions[d];
    
    const t = setInterval(() => {
        desc.textContent += txt[j++];
        if (j === txt.length) {
        clearInterval(t);
        d++;
        if (d < descriptions.length) {
            setTimeout(typeDesc, 1200);
        }
    }
}, 55);
  }
}

slide1Typing();


/* --==================================================--- */


// TOP CARDS + Mission Text
const missionSection = document.getElementById("our-mission");
const cards = document.querySelectorAll(".mission-card");
const title = document.getElementById("mission-title");
const desc = document.getElementById("mission-desc");

const text = "OUR COMPANY MISSION";
let i = 0;

function typeMission(){
  if(i < text.length){
    title.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeMission,120);
  }
}

const observer = new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){
      cards.forEach((card,idx)=>{
        setTimeout(()=>card.classList.add("active"), idx*200);
      });
      
      typeMission();
      
      setTimeout(()=>{
        desc.style.opacity = "1";
        desc.style.transform = "scale(1)";
      },3000);
      
      observer.disconnect();
    }
  },{threshold:0.3});
  
  observer.observe(missionSection);
  
// FOUR GALLERY BOXES FADE + SCALE
const galleryBoxes = document.querySelectorAll(".mission-gallery .gallery-box");

const galleryObserver = new IntersectionObserver(entries=>{
  entries.forEach((entry, idx)=>{
    if(entry.isIntersecting){
      setTimeout(()=>{
        entry.target.classList.add("show");
      }, idx*300); // کمی فاصله بیشتر بین باکس‌ها
    }
  });
},{threshold:0.3});

galleryBoxes.forEach(box => galleryObserver.observe(box));

/* --===========================================================================--- */

// ================= STAR BACKGROUND – SERVICES PAGE =================
(function() {
  const servicesSection = document.querySelector('#services');

  // ایجاد canvas و اضافه کردن به ابتدای section
  const canvas = document.createElement('canvas');
  canvas.id = 'stars';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0; // پشت محتوا
  canvas.style.pointerEvents = 'none';
  servicesSection.prepend(canvas);

  const ctx = canvas.getContext('2d');

  // Gradient کم‌رنگ برای بک‌گراند
  function createGradient() {
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#0b2a4a');  // بالا
    grad.addColorStop(1, '#123456');  // پایین
    return grad;
  }

  function resizeCanvas() {
    canvas.width = servicesSection.offsetWidth;
    canvas.height = servicesSection.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // تعداد و اندازه ستاره‌ها
  const STAR_COUNT = 50;           // تعداد ستاره‌ها
  const stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 2,  // اندازه ستاره‌ها
      speed: Math.random() * 0.3 + 0.1 // سرعت حرکت ستاره
    });
  }

  const STAR_COLOR = 'white';

  function drawStars() {
    // بک‌گراند gradient
    ctx.fillStyle = createGradient();
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = STAR_COLOR;
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(drawStars);
  }

  drawStars();
})();

// ================= REVEAL ON SCROLL FOR SERVICE BOXES =================
const serviceBoxes = document.querySelectorAll('#services .service-box');

function revealServices() {
  serviceBoxes.forEach(box => {
    const top = box.getBoundingClientRect().top;
    const height = window.innerHeight;

    if (top < height - 120) {
      box.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealServices);

// ================= TYPING ANIMATION ON HOVER FOR TITLES =================
const titles = document.querySelectorAll('#services .type-on-hover');

titles.forEach(title => {
  let typed = false;

  title.closest('.service-box').addEventListener('mouseenter', () => {
    if (typed) return;
    typed = true;

    const text = title.dataset.text;
    title.textContent = '';
    let i = 0;

    const typing = setInterval(() => {
      title.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typing);
    }, 50); // سرعت تایپینگ
  });
});

// ================= OUR EXPERT TEAM  =================
// ================= OUR EXPERT TEAM  =================
// Scroll animation
const etTitle = document.querySelector('.et-title');
const etCards = document.querySelectorAll('.et-card');

window.addEventListener('scroll', () => {
  const trigger = window.innerHeight - 120;
  
  if (etTitle.getBoundingClientRect().top < trigger) {
    etTitle.classList.add('show');
  }
  
  etCards.forEach(card => {
    if (card.getBoundingClientRect().top < trigger) {
      card.classList.add('show');
    }
  });
});

// Typing effect for bottom boxes
document.querySelectorAll('.et-wide').forEach(box => {
  const typing = box.querySelector('.et-typing');
  const text = typing.dataset.text;
  let index = 0;
  
  box.addEventListener('mouseenter', () => {
    typing.textContent = '';
    index = 0;
    const interval = setInterval(() => {
      typing.textContent += text[index];
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 20);
    });
  });
  
  // ================= OUR EXPERT TEAM  =================
  // ================= OUR EXPERT TEAM  =================
  
  /* ===== TYPING EFFECT (4 seconds) ===== */

const typingElement = document.getElementById("typing-text");
const typingText = "We are here to help you to find the best way";
let typingIndex = 0;

function typeEffect() {
    if (typingIndex < typingText.length) {
        typingElement.textContent += typingText.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeEffect, 4000 / typingText.length);
    }
}

window.addEventListener("load", () => {
    setTimeout(typeEffect, 500);
});


/* ===== COUNTER ANIMATION (3 seconds smooth) ===== */

const counters = document.querySelectorAll('.stat-number');

const startCounter = (entry) => {
    const counter = entry.target;
    const target = +counter.getAttribute('data-target');
    const hasPlus = counter.getAttribute('data-plus');
    const hasK = counter.getAttribute('data-k');

    let startTime = null;
    const duration = 3000; // 3 seconds

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;
        const value = Math.min(Math.floor((progress / duration) * target), target);

        if (hasK) {
            counter.innerHTML = value + "<span>K</span>";
        } else {
            counter.innerHTML = value;
        }

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            if (hasPlus) {
                counter.innerHTML = target + "+";
            }
        }
    }

    requestAnimationFrame(animate);
};

const observ = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry);
            observ.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observ.observe(counter));


  // ================= OUR EXPERT TEAM  =================
  // ================= OUR EXPERT TEAM  =================

  /* ===== CREW SLIDER SYSTEM ===== */

const crewSlides = document.querySelectorAll(".crew-card");
const arrowPrev = document.querySelector(".crew-prev");
const arrowNext = document.querySelector(".crew-next");

let focusIndex = 1;

function renderCrew() {

    crewSlides.forEach((slide, i) => {
        slide.classList.remove("active", "left", "right");

        if (i === focusIndex) {
            slide.classList.add("active");
        } 
        else if (i === (focusIndex - 1 + crewSlides.length) % crewSlides.length) {
            slide.classList.add("left");
        } 
        else if (i === (focusIndex + 1) % crewSlides.length) {
            slide.classList.add("right");
        }
    });
}

arrowPrev.addEventListener("click", () => {
    focusIndex = (focusIndex - 1 + crewSlides.length) % crewSlides.length;
    renderCrew();
});

arrowNext.addEventListener("click", () => {
    focusIndex = (focusIndex + 1) % crewSlides.length;
    renderCrew();
});

renderCrew();
