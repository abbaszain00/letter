/* ------------------ CONFIG ------------------ */
const letterText = `From the moment we met, something just felt right. 
Even across the distance, I feel your presence every day.
You are my favourite person, my calm in chaos, my smile on bad days.

This site is only a small way to say: I love you. Deeply, completely, endlessly.

💖 Yours always,
[Your Name]`;

const typeSpeed = 45;   // ms per character

/* ------------------ ELEMENTS ------------------ */
const giftBtn        = document.getElementById("gift");
const cover          = document.getElementById("cover");
const letterWrapper  = document.getElementById("letterWrapper");
const typewriterArea = document.getElementById("typewriter");

/* ------------------ 1. OPEN THE GIFT ------------------ */
giftBtn.addEventListener("click", () => {
  /* play bounce–open animation */
  giftBtn.style.animation = "popOpen 1s forwards ease-in-out";

  /* after animation ends, fade cover out & show letter */
  setTimeout(() => {
    cover.style.transition = "opacity 0.8s ease";
    cover.style.opacity = "0";
    setTimeout(() => cover.remove(), 900);

    letterWrapper.classList.remove("hidden");
    letterWrapper.style.animation = "fadeInUp 1.2s ease both";

    startTypewriter();
  }, 1000);
});

/* ------------------ 2. TYPEWRITER FUNCTION ------------------ */
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

/* show letter if JS disabled (basic accessibility) */
document.addEventListener("DOMContentLoaded", () => {
  if (!giftBtn) return;
});
