import gsap from "gsap";

import { StateManager } from "./state-manager";
import { TransitionManager } from "./transition-manager";
import { AutoPlayManager } from "./auto-play-manager";

import { START } from "./slides/START";
import { SLIDE1 } from "./slides/SLIDE1";
import { SLIDE2 } from "./slides/SLIDE2";
import { SLIDE3 } from "./slides/SLIDE3";
import { SLIDE4 } from "./slides/SLIDE4";
import { SLIDE5 } from "./slides/SLIDE5";
import { SLIDE6 } from "./slides/SLIDE6";
import { SLIDE7 } from "./slides/SLIDE7";
import { SLIDE8 } from "./slides/SLIDE8";
import { SLIDE9 } from "./slides/SLIDE9";
// import { SLIDE10 } from "./slides/SLIDE10";
import { svgPause, svgPlay } from "./constants";

// DOM
const slides = gsap.utils.toArray(".slide");
const track = document.querySelector(".slider-track");

const btnPrev = document.getElementById("prev-btn");
const btnNext = document.getElementById("next-btn");
const btnPlay = document.getElementById("play-pause-btn");


// STATE
const state = new StateManager();

// SLIDE → ANIMATION MAP
const slideAnimations = {
    START,
    SLIDE1,
    SLIDE2,
    SLIDE3,
    SLIDE4,
    SLIDE5,
    SLIDE6,
    SLIDE7,
    SLIDE8,
    SLIDE9,
    // SLIDE10,
};

// TRANSITION
const transition = new TransitionManager({
    slides,
    track,
    animations: slideAnimations,
    state,
});

// AUTOPLAY
const autoplay = new AutoPlayManager({
    state,
    transition,
    delay: 3000,
});

state.subscribe(({ isTransitioning }) => {
    btnPrev.disabled = isTransitioning;
    btnNext.disabled = isTransitioning;
});

// BUTTONS
btnNext.addEventListener("click", () => {
    autoplay.stop();      // ⏸ стоп autoplay
    transition.next();    // переход
});

btnPrev.addEventListener("click", () => {
    autoplay.stop();
    transition.prev();
});

btnPlay.addEventListener("click", () => {
    if (state.state === "playing") {
        autoplay.stop();
        btnPlay.innerHTML = svgPlay
    } else {
        autoplay.start();
        btnPlay.innerHTML = svgPause;
    }
});

btnPlay.innerHTML = svgPlay;

state.subscribe(({ state: playerState }) => {
    btnPlay.innerHTML =
        playerState === "playing"
            ? svgPause
            : svgPlay;
});

// INIT (первый слайд)
transition.goTo(0);

