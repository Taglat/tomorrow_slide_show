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
import { SLIDE10 } from "./slides/SLIDE10";

// DOM
const slides = gsap.utils.toArray(".slide");
const track = document.querySelector(".slider-track");

const btnPrev = document.getElementById("prev-btn");
const btnNext = document.getElementById("next-btn");
const btnPlay = document.getElementById("play-pause-btn");
const btnStart = document.getElementById("start-btn");

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
    SLIDE10,
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

// BUTTONS
btnNext.addEventListener("click", () => {
    autoplay.stop();
    transition.next();
});

btnPrev.addEventListener("click", () => {
    autoplay.stop();
    transition.prev();
});

btnPlay.addEventListener("click", () => {
    state.state === "playing"
        ? autoplay.stop()
        : autoplay.start();
});

btnStart?.addEventListener("click", () => {
    autoplay.start();
});

// INIT (первый слайд)
transition.goTo(0);
