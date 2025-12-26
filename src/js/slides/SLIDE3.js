import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE3({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE3: Event Stack");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        // Get cards as regular array
        const cards = Array.from(section.querySelectorAll(".event-card"));

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // RESET
        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(subtitle, { opacity: 0, y: 10 });

        // Config Cards Z-Index so first in DOM is on Top
        cards.forEach((card, i) => {
            gsap.set(card, {
                opacity: 0,
                display: "flex",
                visibility: "visible",
                zIndex: cards.length - i, // 5, 4, 3, 2, 1
                x: 0,
                y: 200, // Start from bottom
                rotation: gsap.utils.random(-10, 10),
                scale: 0.8
            });
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // 1. Show Title
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: ANIMATIONS.TITLE_STAGGER,
            duration: ANIMATIONS.TITLE_DURATION,
            ease: ANIMATIONS.EASE_STEPS_TEXT
        });

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: ANIMATIONS.SUBTITLE_DURATION,
            ease: ANIMATIONS.EASE_OUT
        }, ANIMATIONS.SUBTITLE_DELAY);

        // 2. Deal Cards (Drop them onto stack)
        tl.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: {
                each: 0.1,
                from: "end" // Bottom cards appear first, building the stack up
            },
            duration: 0.6,
            ease: "back.out(1.0)"
        });

        // 3. Flip Through Loop
        cards.forEach((card, i) => {
            // Viewing time
            tl.to({}, { duration: 2.5 });

            // If not the very last card, animate it away
            const isLast = (i === cards.length - 1);

            if (!isLast) {
                tl.to(card, {
                    x: (Math.random() > 0.5 ? 500 : -500), // Throw left or right
                    y: 50, // Slight drop
                    rotation: gsap.utils.random(-45, 45),
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.in"
                });
            } else {
                // Keep the last card a bit longer
                tl.to({}, { duration: 1.0 });
            }
        });

    });
}
