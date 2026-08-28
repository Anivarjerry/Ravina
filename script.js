
/* =====================================================
   SWY BIRTHDAY WEBSITE
   Pure JavaScript — No dependencies
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const screens = [...document.querySelectorAll(".screen")];
  const progressBar = document.getElementById("progressBar");

  let currentScreen = 0;


  /* =====================================================
     SCREEN NAVIGATION
  ===================================================== */

  function showScreen(index) {

    if (index < 0) index = 0;
    if (index >= screens.length) index = screens.length - 1;

    currentScreen = index;

    screens.forEach((screen, i) => {
      screen.classList.toggle("active", i === index);
    });

    screens[index].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    updateProgress();
  }


  function nextScreen() {
    showScreen(currentScreen + 1);
  }


  function updateProgress() {

    const percentage =
      (currentScreen / (screens.length - 1)) * 100;

    progressBar.style.width = `${percentage}%`;
  }


  /* =====================================================
     OPENING BUTTON
  ===================================================== */

  const enterBtn = document.getElementById("enterBtn");

  enterBtn.addEventListener("click", () => {
    nextScreen();
  });


  /* =====================================================
     SWIPE / WHEEL FRIENDLY NAVIGATION
  ===================================================== */

  let wheelLocked = false;

  window.addEventListener(
    "wheel",
    (event) => {

      if (window.innerWidth > 700) {

        if (wheelLocked) return;

        wheelLocked = true;

        if (event.deltaY > 20) {
          nextScreen();
        }

        if (event.deltaY < -20) {
          showScreen(currentScreen - 1);
        }

        setTimeout(() => {
          wheelLocked = false;
        }, 900);
      }

    },
    { passive: true }
  );


  /* =====================================================
     TOUCH SWIPE
  ===================================================== */

  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", (event) => {
    touchStartY = event.changedTouches[0].screenY;
  }, { passive: true });


  document.addEventListener("touchend", (event) => {

    touchEndY = event.changedTouches[0].screenY;

    const difference = touchStartY - touchEndY;

    if (Math.abs(difference) < 70) return;

    if (difference > 0) {
      nextScreen();
    } else {
      showScreen(currentScreen - 1);
    }

  }, { passive: true });


  /* =====================================================
     THINGS I NEVER SAY ENOUGH
  ===================================================== */

  const cards = document.querySelectorAll(".thing-card");

  cards.forEach((card) => {

    card.addEventListener("click", () => {

      const alreadyOpen = card.classList.contains("open");

      cards.forEach((item) => {
        item.classList.remove("open");
      });

      if (!alreadyOpen) {
        card.classList.add("open");
      }

    });

  });


  /* =====================================================
     SECRET PASSWORD
  ===================================================== */

  const passwordInput =
    document.getElementById("passwordInput");

  const unlockBtn =
    document.getElementById("unlockBtn");

  const errorMessage =
    document.getElementById("errorMessage");

  const secretReveal =
    document.getElementById("secretReveal");

  const lockIcon =
    document.getElementById("lockIcon");


  function unlockSecret() {

    const value =
      passwordInput.value.trim().toLowerCase();

    /*
      Secret password:
      SWU

      Also accepting lowercase/uppercase because
      the input is converted to lowercase.
    */

    if (value === "swu") {

      errorMessage.classList.remove("show");

      passwordInput.disabled = true;
      unlockBtn.disabled = true;

      passwordInput.style.opacity = "0.4";
      unlockBtn.style.opacity = "0.4";

      lockIcon.textContent = "♥";

      secretReveal.classList.add("show");

      createHeartBurst();

    } else {

      errorMessage.classList.add("show");

      passwordInput.value = "";

      passwordInput.focus();

      setTimeout(() => {
        errorMessage.classList.remove("show");
      }, 2500);
    }

  }


  unlockBtn.addEventListener("click", unlockSecret);

  passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
      unlockSecret();
    }

  });


  /* =====================================================
     HEART BURST
  ===================================================== */

  function createHeartBurst() {

    for (let i = 0; i < 14; i++) {

      const heart = document.createElement("div");

      heart.textContent = "♥";

      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.zIndex = "999";
      heart.style.pointerEvents = "none";
      heart.style.color = "#e9b6bd";
      heart.style.fontSize = `${10 + Math.random() * 14}px`;

      document.body.appendChild(heart);

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        80 + Math.random() * 180;

      const x =
        Math.cos(angle) * distance;

      const y =
        Math.sin(angle) * distance;

      heart.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 0
          },
          {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1
          },
          {
            transform:
              `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.5)`,
            opacity: 0
          }
        ],
        {
          duration: 1300 + Math.random() * 500,
          easing: "cubic-bezier(.2,.8,.2,1)"
        }
      ).onfinish = () => {
        heart.remove();
      };

    }

  }


  /* =====================================================
     PROGRESS BASED ON CURRENT SCREEN
  ===================================================== */

  updateProgress();


  /* =====================================================
     RESTART
  ===================================================== */

  const restartBtn =
    document.getElementById("restartBtn");

  restartBtn.addEventListener("click", () => {

    secretReveal.classList.remove("show");

    passwordInput.disabled = false;
    unlockBtn.disabled = false;

    passwordInput.style.opacity = "1";
    unlockBtn.style.opacity = "1";

    passwordInput.value = "";

    lockIcon.textContent = "⌕";

    cards.forEach((card) => {
      card.classList.remove("open");
    });

    showScreen(0);

  });


  /* =====================================================
     KEYBOARD NAVIGATION
  ===================================================== */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "ArrowDown" ||
      event.key === "PageDown"
    ) {
      nextScreen();
    }

    if (
      event.key === "ArrowUp" ||
      event.key === "PageUp"
    ) {
      showScreen(currentScreen - 1);
    }

  });


  /* =====================================================
     CONSOLE
  ===================================================== */

  console.log(
    "%cFor SWY ❤️",
    "font-size:22px;font-family:Georgia;color:#e9b6bd;"
  );

  console.log(
    "%cMade with love by SWU.",
    "font-size:13px;color:#999;"
  );

});
