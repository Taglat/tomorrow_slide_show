import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE4({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE4: Спортивные турниры");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const cards = section.querySelectorAll(".sport-card");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, {
            opacity: 0,
            y: -50,
            transformOrigin: "50% 50%",
            rotationX: -90
        });

        gsap.set(subtitle, {
            opacity: 0,
            y: 20
        });

        gsap.set(cards, {
            opacity: 0,
            visibility: "visible",
            scale: 0.2, // Start small (impact)
            x: (i) => (i % 2 === 0 ? -200 : 200), // Fly in from left/right
            rotation: (i) => (i % 2 === 0 ? -15 : 15)
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // ─────────────────────────────
        // 1. TITLE (Hard Slam)
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "back.out(2)" // Strong overshoot
        });

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2");

        // ─────────────────────────────
        // 2. CARDS ACTION (Smash In)
        // ─────────────────────────────
        tl.to(cards, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0, // Straighten up (skew handled by CSS)
            stagger: {
                amount: 0.5,
                from: "random" // Chaotic sport feel
            },
            duration: 0.6,
            ease: "elastic.out(1, 0.75)"
        }, "-=0.1");

        // ─────────────────────────────
        // 3. IDLE (Breathing/Adrenaline)
        // ─────────────────────────────
        // Make individual cards float slightly
        cards.forEach((card, i) => {
            gsap.to(card, {
                y: gsap.utils.random(-5, 5),
                rotation: gsap.utils.random(-1, 1),
                duration: gsap.utils.random(1.5, 2.5),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.1
            });
        });

    });
}
