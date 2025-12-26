import gsap from "gsap";

import { StateManager } from "./state-manager";
import { TransitionManager } from "./transition-manager";
import { AutoPlayManager } from "./auto-play-manager";
import { AudioController } from "./audio-controller";

import { START } from "./slides/START";
import { SLIDE1 } from "./slides/SLIDE1";
import { SLIDE2 } from "./slides/SLIDE2";
import { SLIDE3 } from "./slides/SLIDE3";
import { SLIDE4 } from "./slides/SLIDE4";
import { SLIDE5 } from "./slides/SLIDE5";
import { SLIDE6 } from "./slides/SLIDE6";
import { SLIDE7 } from "./slides/SLIDE7";
import { SLIDE8 } from "./slides/SLIDE8";
import { svgPause, svgPlay } from "./constants";

// ASSETS
import musicUrl from "../mp3/Djo - End of Beginning (Karaoke Version).mp3";

// DOM
const slides = gsap.utils.toArray(".slide");
const track = document.querySelector(".slider-track");

const btnPrev = document.getElementById("prev-btn");
const btnNext = document.getElementById("next-btn");
const btnPlay = document.getElementById("play-pause-btn");


// STATE
const state = new StateManager();

// AUDIO
const audio = new AudioController(musicUrl);

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
    delay: 3500, // Small increase for better pacing
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
        audio.pause();
    } else {
        autoplay.start();
        audio.play();
    }
});

btnPlay.innerHTML = svgPlay;

state.subscribe(({ state: playerState, currentIndex }) => {
    // Update UI
    btnPlay.innerHTML = playerState === "playing" ? svgPause : svgPlay;

    // Logic for ending
    // When autoplay stops naturally at the last slide, the state becomes "paused" 
    // and currentIndex is slides.length - 1
    if (playerState === "paused" && currentIndex === slides.length - 1) {
        console.log("Presentation finished. Fading out music...");
        audio.fadeOut(5); // 5 second fade out as requested
    }
});

// INIT (первый слайд)
transition.goTo(0);

