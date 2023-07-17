const to_aboutus = document.querySelector(".about-us-scroll");
to_aboutus.addEventListener("click", scrollDownAbout);

// scroll to about us section function
function scrollDownAbout() {
  const element = document.querySelector(".about-game");
  element.scrollIntoView();
}

// sign in
const playerNameInput = document.getElementById("player-name");
const playerEmailInput = document.getElementById("player-email");
const startGameButton = document.getElementById("start-game-btn");
function checkInputs() {
  const playerNameValue = playerNameInput.value.trim();
  const playerEmailValue = playerEmailInput.value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isEmailValid = emailRegex.test(playerEmailValue);

  if (playerNameValue !== "" && isEmailValid) {
    startGameButton.setAttribute("href", "characters.html");
    startGameButton.style.display = "block";
    startGameButton.style.cursor = "pointer";
    startGameButton.style.backgroundColor = "rgb(0, 58, 248)";
  } else {
    startGameButton.removeAttribute("href");
    startGameButton.style.cursor = "auto";
  }
}

playerNameInput.addEventListener("input", checkInputs);
playerEmailInput.addEventListener("input", checkInputs);
