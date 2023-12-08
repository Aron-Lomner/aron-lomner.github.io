import { typeWrighter, sleep, isFlexWrapped } from "./utils.js";
import { Particles } from "./particles.js";

async function initialize() {
  let greeting = document.getElementById("greeting");
  let pause = typeWrighter(greeting, "Hello, I'm");
  await sleep(pause);
  let name = document.getElementById("name");
  pause = typeWrighter(name, "Aron Lomner");
  await sleep(pause);
  let occupation = document.getElementById("occupation");
  typeWrighter(occupation, "Fullstack Developer");
}

initialize();
function checkFlexWrap() {
  const coverFlex = document.getElementById("section");
  const bio = document.getElementById("bio");
  if (isFlexWrapped(coverFlex)) {
    bio.style.marginTop = "2vh";
  } else {
    bio.style.marginTop = "0px";
  }
}

window.addEventListener("load", checkFlexWrap);
window.addEventListener("resize", checkFlexWrap);
let container = document.getElementById("logo");

let settings = {
  isText: false,
  color: "#39FF14",
  font: "18px Verdana",
  text: "Welcome!",
  imagePath: "/assets/images/logo.png",
  imageWidth: 184.8,
  imageHeight: 46.4,
  mouseRadius: 15,
  particleRadius: 1,
  scale: 1.2,
  container: container,
  weight: 15,
  padding: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  },
};

if (window.innerWidth < 600) {
  settings.imageHeight = settings.imageHeight / 1.2;
  settings.imageWidth = settings.imageWidth / 1.2;
}

new Particles(settings);
