const selectBoy = document.querySelector(".select-boy");
const selectGirl = document.querySelector(".select-girl");
const selectMario = document.querySelector(".select-mario");
const BoyCharacter = document.querySelector(".boy-character");
const GirlCharater = document.querySelector(".girl-character");
const MarioCharater = document.querySelector(".mario-character");
const SelectedClass = document.querySelectorAll(".Selected");
selectBoy.addEventListener("click", () => {
  if (SelectedClass > 0) {
    SelectedClass.classList.remove("Selected");
  }
  localStorage.clear();
  BoyCharacter.classList.toggle("Selected");
  selectBoy.innerHTML = "Seleted";
  var boydata = {
    right: {
      image: "boy-right.png",
      frameWidth: 55,
      frameHeight: 75,
      rightAnims: { start: 0, end: 3 },
    },
    left: {
      image: "boy.png",
      frameWidth: 55,
      frameHeight: 55.5,
      leftAnims: { start: 11, end: 9 },
    },
    up: {
      image: "boy.png",
      frameWidth: 55,
      frameHeight: 80,
      downAnims: { start: 0, end: 2 },
      upAnims: { start: 3, end: 5 },
    },
    image: "boy.png",
    frameWidth: 55,
    frameHeight: 80,
    downAnims: { start: 0, end: 2 },
    stopAnims: { start: 0, end: 0 },
  };

  let ConvertData = JSON.stringify(boydata);

  localStorage.setItem("playerData", ConvertData);
});

selectGirl.addEventListener("click", () => {
  if (SelectedClass > 0) {
    SelectedClass.classList.remove("Selected");
  }
  localStorage.clear();
  MarioCharater.classList.toggle("Selected");
  selectBoy.innerHTML = "Seleted";

  const girldata = {
    right: {
      image: "girl.png",
      frameWidth: 47,
      frameHeight: 65,
      rightAnims: { start: 4, end: 5 },
    },
    left: {
      image: "girl.png",
      frameWidth: 47,
      frameHeight: 65,
      leftAnims: { start: 8, end: 9 },
    },
    up: {
      image: "girl.png",
      frameWidth: 47,
      frameHeight: 65,
      upAnims: { start: 12, end: 13 },
    },
    image: "girl.png",
    frameWidth: 47,
    frameHeight: 65,
    downAnims: { start: 0, end: 3 },
    stopAnims: { start: 1, end: 1 },
  };
  let ConvertData = JSON.stringify(girldata);

  localStorage.setItem("playerData", ConvertData);
});

selectMario.addEventListener("click", () => {
  if (SelectedClass > 0) {
    SelectedClass.classList.remove("Selected");
  }
  localStorage.clear();
  selectBoy.classList.toggle("Selected");
  selectBoy.innerHTML = "Seleted";

  const mariodata = {
    right: {
      image: "all.png",
      frameWidth: 60,
      frameHeight: 65,
      rightAnims: { start: 8, end: 11 },
    },
    left: {
      image: "all.png",
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
    image: "all.png",
    frameWidth: 60,
    frameHeight: 65,
    downAnims: { start: 0, end: 3 },
    stopAnims: { start: 0, end: 0 },
  };

  let ConvertData = JSON.stringify(mariodata);

  localStorage.setItem("playerData", ConvertData);
});
