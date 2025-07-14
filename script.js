/* ------------------ CONFIG ------------------ */
const letterText = `I know you hated when I told you that your letter would come soon whenever you asked. It was really hard keeping this from you. I also don't know how you're gonna react because you don't like surprises, but I really really hope you like this. It was soo hard to keep this from you, but here it is :)

It is the 18th of July. That means it has officially been TWO WHOLE MONTHS since I first met you on ometv. How crazy is that? I don't know about you but it feels like I've known you for so much longer. That's probably such a cliché thing to say but it's the truth for me. I'm currently writing this while you're on facetime on our 'study sesh' lol. You look so cute when you're talking to yourself explaining all those confusing medical topics. They always go over my head, but you explaining them to me one by one has now become one of my favourite things to do. I could listen to you talk about pathophys and pathogenesis and pathophysiology and all the rest of it for ages. I would never get bored. I could never be bored of anything as long as it's with you.

Do you remember the first few times we tried to call after we spoke on OmeTV? It was so bad. I was always overthinking about messaging you too much, so I would wait for you to message first. I was DYING to talk to you, but you were older and told me you had exams so I really really didn't wanna overdo anything and creep you out. I remember that one time we said we would talk at a certain time, and I waited ages for you to message me. In hindsight I was being a bitch and should've just texted you. I don't really know what I was thinking. I was just sat in my room eagerly waiting for you to send a message or ANYTHING. It was really silly and I was really mad at myself after for not being the one to do it first. Eventually we did call and I really enjoyed it. I really mean it when I say I love talking and spending time with you. Nowadays the first thing I think about as soon as I wake up is you. Let me check if Noor sent me a message. I wonder what Noor is up to right now? I hope Noor got some sleep. I hope I get to call Noor today. I wonder if she missed me? You're now a constant part of my mind, and that makes you a part of me now and I love it.

You asked me recently whether I love hard or deep. To tell you the truth, I'm still not completely sure as to what that means. In fact, I'm still not really sure what my answer is either. But, one thing I'm certain of Noor is that I love you. I love you more than you could ever image. I love you more and more with every passing day. I love you whether you're smiling and laughing, or when you're angry or sad. It doesn't matter. My love doesn't depend on the way you are, or the way you feel, or the way you look at any given time. I just love you. Nothing else matters to me. You can be stressed, angry or have tears streaming down your face. I still love you with every fibre of my being. It's been two months, but I have welcomed and accepted you as a part of my life, and a part of me. I do not think about myself now without thinking about you too. I can no longer think of a future without Noor. I want to be the best man I can be for you, because you deserve nothing less. 



Yours always,
Abbas`;

let typeSpeed = 45;   // ms per character
const speedLevels = [
  { speed: 45, label: "Normal Speed" },
  { speed: 20, label: "Fast" },
  { speed: 10, label: "Very Fast" },
  { speed: 3, label: "Super Fast" },
  { speed: 0, label: "Instant" }
];
let currentSpeedIndex = 0;

/* ------------------ ELEMENTS ------------------ */
const envelope = document.getElementById("envelope");
const envelopeClosed = document.getElementById("envelopeClosed");
const envelopeOpen = document.getElementById("envelopeOpen");
const successMsg = document.getElementById("successMsg");
const cover = document.getElementById("cover");
const letterWrapper = document.getElementById("letterWrapper");
const typewriterArea = document.getElementById("typewriter");
const speedControl = document.getElementById("speedControl");
const speedBtn = document.getElementById("speedBtn");
const speedIndicator = document.getElementById("speedIndicator");

let isOpened = false;
let isTyping = false;
let typewriterTimeout;

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

      // Show speed control and start typewriter
      setTimeout(() => {
        speedControl.classList.add('show');
        startTypewriter();
      }, 600);
    }, 500);
  }, 4500);
});

/* ------------------ SPEED CONTROL ------------------ */
speedBtn.addEventListener('click', function() {
  if (!isTyping) return;
  
  currentSpeedIndex = (currentSpeedIndex + 1) % speedLevels.length;
  typeSpeed = speedLevels[currentSpeedIndex].speed;
  speedIndicator.textContent = speedLevels[currentSpeedIndex].label;
  
  // Add a little animation to show the change
  speedBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    speedBtn.style.transform = 'scale(1)';
  }, 150);
});

/* ------------------ TYPEWRITER FUNCTION ------------------ */
function startTypewriter() {
  isTyping = true;
  let i = 0;
  
  function type() {
    if (i < letterText.length) {
      typewriterArea.textContent += letterText.charAt(i);
      i++;
      
      if (typeSpeed === 0) {
        // Instant mode: type everything at once
        while (i < letterText.length) {
          typewriterArea.textContent += letterText.charAt(i);
          i++;
        }
        // Call the completion logic
        typeComplete();
      } else {
        typewriterTimeout = setTimeout(type, typeSpeed);
      }
    } else {
      typeComplete();
    }
  }
  
  function typeComplete() {
    // Typing complete
    isTyping = false;
    typewriterArea.classList.add('typing-complete');
    
    // Hide speed control when typing is complete
    setTimeout(() => {
      speedControl.classList.remove('show');
    }, 2000);
    
    // Add some final sparkles
    for (let j = 0; j < 10; j++) {
      setTimeout(() => createSparkle(), j * 200);
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