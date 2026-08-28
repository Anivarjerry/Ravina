document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     PROGRESS BAR
  =============================== */

  const progress = document.getElementById("progress");

  function updateProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) return;

    const percentage =
      (scrollTop / documentHeight) * 100;

    progress.style.width = `${percentage}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  updateProgress();


  /* ===============================
     SMOOTH SECTION NAVIGATION
  =============================== */

  window.scrollToId = function(id) {

    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  };


  /* ===============================
     10 THINGS
  =============================== */

  const things =
    document.querySelectorAll(".thing");

  things.forEach((thing) => {

    thing.addEventListener("click", () => {

      const isOpen =
        thing.classList.contains("open");

      things.forEach((item) => {
        item.classList.remove("open");
      });

      if (!isOpen) {
        thing.classList.add("open");
      }

    });

  });


  /* ===============================
     SECRET
  =============================== */

  const input =
    document.getElementById("secretInput");

  const unlock =
    document.getElementById("unlock");

  const result =
    document.getElementById("secretResult");

  const error =
    document.getElementById("error");

  const lock =
    document.getElementById("lock");


  function checkPassword() {

    const value =
      input.value.trim().toLowerCase();

    if (value === "swu") {

      error.classList.remove("show");

      result.classList.add("show");

      lock.textContent = "♥";

      input.disabled = true;
      unlock.disabled = true;

      createHearts();

    } else {

      error.classList.add("show");

      input.value = "";

      input.focus();

      setTimeout(() => {
        error.classList.remove("show");
      }, 2200);

    }

  }


  unlock.addEventListener(
    "click",
    checkPassword
  );


  input.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Enter") {
        checkPassword();
      }

    }
  );


  /* ===============================
     HEART ANIMATION
  =============================== */

  function createHearts() {

    for (let i = 0; i < 18; i++) {

      const heart =
        document.createElement("div");

      heart.textContent = "♥";

      heart.style.position = "fixed";
      heart.style.left = "50%";
      heart.style.top = "50%";

      heart.style.color = "#e9b5bd";
      heart.style.fontSize =
        `${10 + Math.random() * 14}px`;

      heart.style.pointerEvents = "none";
      heart.style.zIndex = "9999";

      document.body.appendChild(heart);

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        80 + Math.random() * 170;

      const x =
        Math.cos(angle) * distance;

      const y =
        Math.sin(angle) * distance;

      const animation =
        heart.animate(
          [
            {
              transform:
                "translate(-50%, -50%) scale(0)",
              opacity: 0
            },
            {
              transform:
                "translate(-50%, -50%) scale(1)",
              opacity: 1
            },
            {
              transform:
                `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.4)`,
              opacity: 0
            }
          ],
          {
            duration:
              1200 + Math.random() * 600,

            easing:
              "cubic-bezier(.2,.8,.2,1)"
          }
        );

      animation.onfinish = () => {
        heart.remove();
      };

    }

  }


  /* ===============================
     CONSOLE
  =============================== */

  console.log(
    "%cFor SWY ♥",
    "font-family:Georgia;font-size:24px;color:#e9b5bd;"
  );

  console.log(
    "%cMade by SWU.",
    "font-size:14px;color:#999;"
  );

});      showScreen(currentScreen - 1);
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
