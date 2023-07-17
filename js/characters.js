const BoyCharacter = document.querySelector(".boy-character");
const GirlCharacter = document.querySelector(".girl-character");
const MarioCharacter = document.querySelector(".mario-character");
const SelectedClass = document.querySelectorAll(".selected");

BoyCharacter.addEventListener("click", () => {
  const SelectedClass = document.getElementsByClassName("selected");

  if (SelectedClass.length > 0) {
    for (i = 0; i < SelectedClass.length; i++) {
      if (SelectedClass[i].classList.contains("selected")) {
        SelectedClass[i].classList.remove("selected");
      }
    }
  }
  if (!BoyCharacter.classList.contains("selected")) {
    BoyCharacter.classList.add("selected");
  } else {
    BoyCharacter.classList.remove("selected");
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

GirlCharacter.addEventListener("click", () => {
  const SelectedClass = document.getElementsByClassName("selected");

  console.log(SelectedClass.length);

  if (SelectedClass.length > 0) {
    for (i = 0; i < SelectedClass.length; i++) {
      if (SelectedClass[i].classList.contains("selected")) {
        SelectedClass[i].classList.remove("selected");
      }
    }
  }

  if (!GirlCharater.classList.contains("selected")) {
    GirlCharater.classList.add("selected");
  } else {
    GirlCharater.classList.remove("selected");
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

MarioCharacter.addEventListener("click", () => {
  const SelectedClass = document.getElementsByClassName("selected");

  if (SelectedClass.length > 0) {
    for (i = 0; i < SelectedClass.length; i++) {
      if (SelectedClass[i].classList.contains("selected")) {
        SelectedClass[i].classList.remove("selected");
      }
    }
  }
  if (!MarioCharater.classList.contains("selected")) {
    MarioCharater.classList.add("selected");
  } else {
    MarioCharater.classList.remove("selected");
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
