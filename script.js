document.addEventListener("DOMContentLoaded", function () {

  // Progress bar
  const progress = document.getElementById("progress");

  function updateProgress() {
    if (!progress) return;

    const total =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const current = window.scrollY;

    if (total <= 0) return;

    progress.style.width =
      (current / total) * 100 + "%";
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress();


  // Smooth navigation
  window.scrollToId = function (id) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };


  // ==========================================
  // 10 THINGS
  // ==========================================

  const things =
    document.querySelectorAll(".thing");

  things.forEach(function (thing) {

    thing.addEventListener("click", function (event) {

      event.preventDefault();

      const wasOpen =
        this.classList.contains("open");

      // Close all
      things.forEach(function (item) {
        item.classList.remove("open");
      });

      // Open clicked one
      if (!wasOpen) {
        this.classList.add("open");
      }

    });

  });


  // ==========================================
  // SECRET PASSWORD
  // ==========================================

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

    if (!input) return;

    const value =
      input.value.trim().toLowerCase();

    if (value === "swu") {

      if (error) {
        error.classList.remove("show");
      }

      if (result) {
        result.classList.add("show");
      }

      if (lock) {
        lock.textContent = "♥";
      }

      input.disabled = true;

      if (unlock) {
        unlock.disabled = true;
      }

      createHearts();

    } else {

      if (error) {
        error.classList.add("show");
      }

      input.value = "";

      setTimeout(function () {

        if (error) {
          error.classList.remove("show");
        }

      }, 2200);
    }
  }


  if (unlock) {
    unlock.addEventListener(
      "click",
      checkPassword
    );
  }


  if (input) {
    input.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Enter") {
          checkPassword();
        }

      }
    );
  }


  // ==========================================
  // HEARTS
  // ==========================================

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
        (10 + Math.random() * 14) + "px";
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
                "translate(calc(-50% + " +
                x +
                "px), calc(-50% + " +
                y +
                "px)) scale(.4)",
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

      animation.onfinish = function () {
        heart.remove();
      };

    }
  }


  console.log("For SWY ❤️");
  console.log("Made with love by SWU.");

});
