/* ------------------ CONFIG ------------------ */
const letterText = `From the moment we met, something just felt right.
Even across the distance, I feel your presence every day.
You are my favourite person, my calm in chaos, my smile on bad days.

This site is only a small way to say: I love you. Deeply, completely, endlessly.

💖 Yours always,
[Your Name]`;

const typeSpeed = 45;   // ms per character

/* ------------------ ELEMENTS ------------------ */
const envelope = document.getElementById("envelope");
const envelopeClosed = document.getElementById("envelopeClosed");
const envelopeOpen = document.getElementById("envelopeOpen");
const successMsg = document.getElementById("successMsg");
const cover = document.getElementById("cover");
const letterWrapper = document.getElementById("letterWrapper");
const typewriterArea = document.getElementById("typewriter");

let isOpened = false;

/* ------------------ ENVELOPE OPENING ------------------ */
envelope.addEventListener('click', function(e) {
  if (isOpened) return;
  
  isOpened = true;
  
  // Start the crossfade animation
  envelope.classList.add('opening');
  
  // Create floating hearts
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      createHeart(e.clientX, e.clientY);
    }, i * 150);
  }

  // Create sparkles
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createSparkle();
    }, i * 100);
  }

  // Show success message first
  setTimeout(() => {
    successMsg.classList.add('show');
  }, 1800);

  // THEN transition to main love letter
  setTimeout(() => {
    successMsg.classList.remove('show');
    
    // Wait a moment after success message disappears
    setTimeout(() => {
      // Add roses background
      document.body.classList.add('roses-active');
      
      // Fade out cover and show letter
      cover.style.transition = "opacity 0.8s ease";
      cover.style.opacity = "0";
      setTimeout(() => cover.remove(), 900);

      letterWrapper.classList.remove("hidden");
      letterWrapper.style.animation = "fadeInUp 1.2s ease both";

      startTypewriter();
    }, 500);
  }, 4500);
});

/* ------------------ TYPEWRITER FUNCTION ------------------ */
function startTypewriter() {
  let i = 0;
  function type() {
    if (i < letterText.length) {
      typewriterArea.textContent += letterText.charAt(i);
      i++;
      setTimeout(type, typeSpeed);
    }
  }
  type();
}

/* ------------------ EFFECT FUNCTIONS ------------------ */
function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💕';
  heart.style.left = (x - 10 + Math.random() * 40) + 'px';
  heart.style.top = (y - 10 + Math.random() * 20) + 'px';
  document.body.appendChild(heart);
  
  setTimeout(() => heart.classList.add('animate'), 10);
  setTimeout(() => heart.remove(), 2000);
}

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = (Math.random() * window.innerWidth) + 'px';
  sparkle.style.top = (Math.random() * window.innerHeight) + 'px';
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.classList.add('animate'), 10);
  setTimeout(() => sparkle.remove(), 1500);
}

/* show letter if JS disabled (basic accessibility) */
document.addEventListener("DOMContentLoaded", () => {
  if (!envelope) return;
});