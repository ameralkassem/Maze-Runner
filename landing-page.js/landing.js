
// scroll to start game section function
function scrollDownStart() {
    const element = document.querySelector(".start-game-form");
    element.scrollIntoView();
}

// scroll to about us section function
function scrollDownAbout() {
    const element = document.querySelector(".start-game-btn");
    element.scrollIntoView();
}

const to_start = document.querySelector(".start-game-scroll");
to_start.addEventListener("click",scrollDownStart);


const to_aboutus = document.querySelector(".about-us-scroll");
to_aboutus.addEventListener("click",scrollDownAbout);

const playerNameInput = document.getElementById('player-name');
const playerEmailInput = document.getElementById('player-email');
const startGameButton = document.getElementById('start-game-btn');

function checkInputs() {
    const playerNameValue = playerNameInput.value.trim();
    const playerEmailValue = playerEmailInput.value.trim();

        
    if (playerNameValue !== '' && playerEmailValue !== '') {
        startGameButton.disabled = false;
    } else {
        startGameButton.disabled = true;
    }
}

    
playerNameInput.addEventListener('input', checkInputs);
playerEmailInput.addEventListener('input', checkInputs);
