function startSurprize() {
  const textArray = [
    "Salut! Eu sunt George, prietenul vostru nebun preferat.",
    "Și am o poveste pe care trebuie s-o împărtășesc cu voi.",
    "Știi că întotdeauna am fost un magnet pentru aventuri ciudate. Ei bine, ultima mea ispravă implică o mașină și... o cerere în căsătorie!",
    `Totul a început când, într-o seară frumoasă de duminică, am “reușit” să fac un mic accident de mașină. Nimeni nu a fost rănit, doar mașina a cam suferit.`,
    `Și cum stăteam cu Andreea acolo, privind la stele și așteptând remorcarea, m-am gândit că să transform această amintire neplăcută într-una memorabilă. Așadar, printre cioburi și agitație, am scos inelul de logodnă din sacou și, punându-mă în genunchi, am spus:`,
    `Țuș, vrei să fii soția mea?`,
    `Și ghici ce?`,
    `A spus „DA”.`,
    `Și acum o să mă întrebați de ce vă povestesc toate astea 🤷‍♀️?`,
  ];

  const fullText = `Pentru că sunteți mișto destul cât să ne fiți nașii de cununie și crazy destul ca să ziceți Da.`;

  let paragraphIndex = 0;
  let charIndex = 0;
  const typingSpeed = 50;
  const deletingSpeed = 5;
  const pauseBetweenParagraphs = 1000;
  function typeText(text, callback) {
    function typeText(text, callback) {
      // Check if the next characters form the special text „DA”
      if (text.substring(charIndex, charIndex + 3) === "„DA”") {
        const da = document
          .getElementById("dynamic-text")
          .insertAdjacentHTML("beforeend", '<div class="fancy-yes">DA</div>');
        // Adjust charIndex to skip over the special text
        charIndex += 3; // Skip „DA”
      } else if (charIndex < text.length) {
        // Continue typing the next character if not at the special text
        document
          .getElementById("dynamic-text")
          .insertAdjacentHTML("beforeend", text.charAt(charIndex));
        charIndex++;
      }

      // Check if there's more text to type or if it's time to call the callback
      if (charIndex < text.length) {
        setTimeout(() => typeText(text, callback), typingSpeed);
      } else {
        setTimeout(callback, pauseBetweenParagraphs);
      }
    }
    // Check if the next characters form the special text „DA”
    if (text.substring(charIndex, charIndex + 3) === "„DA”") {
      // Insert the styled div instead of typing „DA”
      document.getElementById("dynamic-text").innerHTML +=
        '<div class="fancy-yes">DA</div>';
      // Adjust charIndex to skip over the special text
      charIndex += 3; // Skip „DA”
    } else if (charIndex < text.length) {
      // Continue typing the next character if not at the special text
      document.getElementById("dynamic-text").innerHTML +=
        text.charAt(charIndex);
      charIndex++;
    }

    // Check if there's more text to type or if it's time to call the callback
    if (charIndex < text.length) {
      setTimeout(() => typeText(text, callback), typingSpeed);
    } else {
      setTimeout(callback, pauseBetweenParagraphs);
    }
  }
  function deleteText(callback) {
    const currentText = document.getElementById("dynamic-text").innerHTML;
    if (currentText.length > 0) {
      document.getElementById("dynamic-text").innerHTML = currentText.substring(
        0,
        currentText.length - 1
      );
      setTimeout(() => deleteText(callback), deletingSpeed);
    } else {
      callback();
    }
  }

  function showNextParagraph() {
    if (paragraphIndex < textArray.length) {
      if (paragraphIndex >= 5) {
        const imageLeftElement = document.querySelector(".image-left");
        imageLeftElement.style.display = "flex";
        // Add the zoom-in class to trigger the animation
        imageLeftElement.classList.add("fade-in");
      }
      charIndex = 0;
      typeText(textArray[paragraphIndex], () => {
        setTimeout(() => {
          deleteText(() => {
            paragraphIndex++;
            showNextParagraph();
          });
        }, pauseBetweenParagraphs);
      });
    } else {
      // Începe tranziția de fundal și stilul textului
      document.body.style.transition = "background-color 1s ease";
      document.body.style.backgroundColor = "white";
      document.getElementById("dynamic-text").style.transition =
        "color 1s ease, font-size 1s ease, font-weight 1s ease";
      document.getElementById("dynamic-text").style.color = "#7f00ff";
      document.getElementById("dynamic-text").style.fontWeight = "bold";

      const imageLeftElement = document.querySelector(".image-left");
      imageLeftElement.classList.add("fade-out");
      const imageRightElement = document.querySelector(".image-right");
      imageRightElement.style.display = "flex";
      // Add the zoom-in class to trigger the animation
      imageRightElement.classList.add("fade-in");
      setTimeout(() => {
        deleteText(() => {
          // După ce s-a șters tot textul, scrie textul final
          document.getElementById("final-question").style.display = "block";

          charIndex = 0;
          typeText(fullText, () => {
            const detailsButton = document.getElementById("details-button");
            detailsButton.style.opacity = "0"; // Ensure it starts from invisible
            detailsButton.style.maxHeight = "0px"; // Start collapsed
            detailsButton.style.display = "flex"; // Make it a flex container to start transition
            setTimeout(() => {
              detailsButton.style.opacity = "1"; // Fade in
              detailsButton.style.maxHeight = "500px"; // Adjust to the content's height or set to a value that ensures full expansion
            }, 10);
          });
        });
      }, 1000); // Așteaptă 1 secundă pentru tranziția de fundal
    }
  }

  setTimeout(() => {
    showNextParagraph();
  }, 500);
}

function showTerms() {
  document.getElementById("final-question").style.display = "none"; // Ascunde întrebarea finală
  document.getElementById("details-button").style.display = "none"; // Ascunde butonul de acceptare
  document.getElementById("terms").style.display = "block"; // Afișează termenii și condițiile
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("DOMContentLoaded", () => {
    const declineBtn = document.getElementById("decline-btn");

    declineBtn.addEventListener("mouseover", () => {
      const buttonWidth = declineBtn.offsetWidth;
      const buttonHeight = declineBtn.offsetHeight;

      // Calculate the maximum allowed movement to keep the button within the window
      const maxMoveX = window.innerWidth - buttonWidth; // Maximum X coordinate
      const maxMoveY = window.innerHeight - buttonHeight; // Maximum Y coordinate

      // Calculate a new position within the allowed range
      const newLeft = Math.random() * maxMoveX;
      const newTop = Math.random() * maxMoveY;

      // Temporarily hide the button to simulate movement
      declineBtn.style.opacity = "0";

      setTimeout(() => {
        declineBtn.style.position = "absolute";
        declineBtn.style.left = `${newLeft}px`;
        declineBtn.style.top = `${newTop}px`;

        // Make the button visible again
        setTimeout(() => {
          declineBtn.style.opacity = "1";
        }, 0);
      }, 300); // Delay to simulate the button moving away
    });
  });
  const declineBtn = document.getElementById("decline-btn");

  declineBtn.addEventListener("mouseover", () => {
    // Preserve the original dimensions of the button
    const buttonWidth = declineBtn.offsetWidth;
    const buttonHeight = declineBtn.offsetHeight;

    // Calculate random movement
    const maxMoveX = window.innerWidth * 0.2; // 20% of the window width
    const maxMoveY = window.innerHeight * 0.2; // 20% of the window height

    // Generate a random movement in any direction
    const moveX = Math.random() * maxMoveX * (Math.random() < 0.5 ? 1 : -1);
    const moveY = Math.random() * maxMoveY * (Math.random() < 0.5 ? 1 : -1);

    // Ensure the button remains within the visible window boundaries
    const maxAllowedLeft = window.innerWidth - buttonWidth;
    const maxAllowedTop = window.innerHeight - buttonHeight;

    const newLeft = Math.min(
      Math.max(0, declineBtn.offsetLeft + moveX),
      maxAllowedLeft
    );
    const newTop = Math.min(
      Math.max(0, declineBtn.offsetTop + moveY),
      maxAllowedTop
    );

    declineBtn.style.opacity = "0"; // Make the button invisible

    setTimeout(() => {
      declineBtn.style.position = "absolute";
      declineBtn.style.left = `${newLeft}px`;
      declineBtn.style.top = `${newTop}px`;

      // Return to normal opacity
      setTimeout(() => {
        declineBtn.style.opacity = "1";
      }, 0);
    }, 300); // Wait 0.3 seconds to move the button
  });
});

function trickAccept() {
  // Selectează butonul cu id-ul 'declineButton' și modifică stilurile și textul
  var declineButton = document.getElementById("decline-btn");

  if (declineButton) {
    declineButton.style.background = "#7f00ff";
    declineButton.textContent = "Vrem";
  }

  var acceptButton = document.getElementById("accept-btn");
  if (acceptButton) {
    acceptButton.style.backgroundColor = "red"; // Schimbă culoarea de fundal în roșu
    acceptButton.textContent = "Nu Vrem"; // Schimbă textul butonului în "Nu Vrem"

    acceptButton.style.opacity = "1";
    acceptButton.style.transition = "opacity 10s ease-in-out";

    setTimeout(() => {
      acceptButton.style.opacity = "0";
      // Optionally hide the button from layout after fade out
      setTimeout(() => (acceptButton.style.display = "none"), 10000); // Adjust timing if needed
    }, 0); // You can delay the start of the fade effect by changing 0 to another value (in milliseconds)
  }
  accept();
}
function accept() {
  document.getElementById("decline-btn").style.display = "none";
  const imageLeftElement = document.querySelector(".image-left");
  imageLeftElement.classList.add("fade-in");
  // Check if the animation is already running
  if (window.isAnimating) return;

  // Mark the animation as running
  window.isAnimating = true;

  var duration = 10 * 1000; // Duration of 10 seconds
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      scalar: 1.5,
      colors: [
        "#7f00ff",
        "#bb0000",
        "#ffffff",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
        "#ff7f00",
        "#7fff00",
        "#007fff",
        "#ff007f",
      ],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      scalar: 1.5,
      colors: [
        "#7f00ff",
        "#bb0000",
        "#ffffff",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
        "#ff7f00",
        "#7fff00",
        "#007fff",
        "#ff007f",
      ],
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { y: 1, x: 1 },
      scalar: 1.5,
      colors: [
        "#7f00ff",
        "#bb0000",
        "#ffffff",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
        "#ff7f00",
        "#7fff00",
        "#007fff",
        "#ff007f",
      ],
    });
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { y: 1, x: 0 },
      scalar: 1.5,
      colors: [
        "#7f00ff",
        "#bb0000",
        "#ffffff",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
        "#ffff00",
        "#ff7f00",
        "#7fff00",
        "#007fff",
        "#ff007f",
      ],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      // Reset the flag when the animation is finished
      window.isAnimating = false;
    }
  })();
}

//wine

document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");

  // API URL for red wines
  const apiUrl = "https://api.sampleapis.com/wines/reds";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((wine) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
                    <img src="${wine.image}" alt="${wine.wine}">
                    <h3>${wine.wine}</h3>
                    <p>${wine.winery}</p>
                    <p>${wine.rating.average} / 5.0 (${wine.rating.reviews})</p>
                `;
        productDiv.addEventListener("click", wineClick);
        productGrid.appendChild(productDiv);
      });
    })
    .catch((error) => {
      console.error("Eroare la preluarea datelor:", error);
      productGrid.innerHTML =
        "<p>Nu s-au putut încărca produsele. Vă rugăm să încercați din nou mai târziu.</p>";
    });
});
function wineClick() {
  document.querySelector(".wine-body").classList.add("hidden");
  document.querySelector(".surprise").classList.remove("hidden");
  startSurprize();
}

document.addEventListener("DOMContentLoaded", function () {
  var scrollToProductsBtn = document.getElementById("scrollToProducts");
  var productGrid = document.getElementById("product-grid");

  scrollToProductsBtn.addEventListener("click", function () {
    productGrid.scrollIntoView({ behavior: "smooth" });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var scrollToAboutBtn = document.getElementById("scrollToAbout");
  var aboutSection = document.getElementById("about");

  scrollToAboutBtn.addEventListener("click", function () {
    aboutSection.scrollIntoView({ behavior: "smooth" });
  });
});
