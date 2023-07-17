const Boy_character = document.querySelector(".boy-character");
const Girl_character = document.querySelector(".girl-character");
const Mario_character = document.querySelector(".mario-character");
const start_button = document.getElementById("lets-play");

start_button.addEventListener("click", () => {
  window.location.href = "level1index.html";
});

Boy_character.addEventListener("click", () => {
  const Selected_class = document.getElementsByClassName("selected");

  if (Selected_class.length > 0) {
    for (i = 0; i < Selected_class.length; i++) {
      if (Selected_class[i].classList.contains("selected")) {
        Selected_class[i].classList.remove("selected");
      }
    }
  }
  if (!Boy_character.classList.contains("selected")) {
    Boy_character.classList.add("selected");
  } else {
    Boy_character.classList.remove("selected");
  }
  localStorage.clear();
  const boydata = {
    player: {
      image: "player-boy.png",
    },
    right: {
      image: "boy-right.png",
      frameWidth: 55,
      frameHeight: 75,
      rightAnims: { start: 0, end: 3 },
    },
    left: {
      image: "boy-pieces.png",
      frameWidth: 55,
      frameHeight: 55.5,
      leftAnims: { start: 11, end: 9 },
    },
    up: {
      image: "boy-pieces.png",
      frameWidth: 55,
      frameHeight: 80,
      downAnims: { start: 0, end: 2 },
      upAnims: { start: 3, end: 5 },
    },
    image: "boy-pieces.png",
    frameWidth: 55,
    frameHeight: 80,
    downAnims: { start: 0, end: 2 },
    stopAnims: { start: 0, end: 0 },
  };

  let ConvertData = JSON.stringify(boydata);

  localStorage.setItem("playerData", ConvertData);
});

Girl_character.addEventListener("click", () => {
  const Selected_class = document.getElementsByClassName("selected");

  if (Selected_class.length > 0) {
    for (i = 0; i < Selected_class.length; i++) {
      if (Selected_class[i].classList.contains("selected")) {
        Selected_class[i].classList.remove("selected");
      }
    }
  }

  if (!Girl_character.classList.contains("selected")) {
    Girl_character.classList.add("selected");
  } else {
    Girl_character.classList.remove("selected");
  }
  localStorage.clear();

  const girldata = {
    player: {
      image: "player-girl.png",
    },
    right: {
      image: "girl-pieces.png",
      frameWidth: 47,
      frameHeight: 65,
      rightAnims: { start: 4, end: 5 },
    },
    left: {
      image: "girl-pieces.png",
      frameWidth: 47,
      frameHeight: 65,
      leftAnims: { start: 8, end: 9 },
    },
    up: {
      image: "girl-pieces.png",
      frameWidth: 47,
      frameHeight: 65,
      upAnims: { start: 12, end: 13 },
    },
    image: "girl-pieces.png",
    frameWidth: 47,
    frameHeight: 65,
    downAnims: { start: 0, end: 3 },
    stopAnims: { start: 1, end: 1 },
  };

  let ConvertData = JSON.stringify(girldata);

  localStorage.setItem("playerData", ConvertData);
});

Mario_character.addEventListener("click", () => {
  const Selected_class = document.getElementsByClassName("selected");

  if (Selected_class.length > 0) {
    for (i = 0; i < Selected_class.length; i++) {
      if (Selected_class[i].classList.contains("selected")) {
        Selected_class[i].classList.remove("selected");
      }
    }
  }
  if (!Mario_character.classList.contains("selected")) {
    Mario_character.classList.add("selected");
  } else {
    Mario_character.classList.remove("selected");
  }
  localStorage.clear();

  const mariodata = {
    player: {
      image: "mario-player.png",
    },
    right: {
      image: "mario-pieces.png",
      frameWidth: 60,
      frameHeight: 65,
      rightAnims: { start: 8, end: 11 },
    },
    left: {
      image: "mario-pieces.png",
      frameWidth: 60,
      frameHeight: 65,
      leftAnims: { start: 7, end: 4 },
    },
    up: {
      image: "mario-up.png",
      frameWidth: 75,
      frameHeight: 65,
      upAnims: { start: 0, end: 3 },
    },
    image: "mario-pieces.png",
    frameWidth: 60,
    frameHeight: 65,
    downAnims: { start: 0, end: 3 },
    stopAnims: { start: 0, end: 0 },
  };

  let ConvertData = JSON.stringify(mariodata);

  localStorage.setItem("playerData", ConvertData);
});
