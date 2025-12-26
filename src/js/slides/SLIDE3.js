import gsap from "gsap";
import { prepareTitle } from "./utils";

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
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        });

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.3
        }, "-=0.2");

        // 2. Deal Cards (Drop them onto stack)
        // We want the bottom card (last index) to drop first? 
        // No, we want the stack to build up or just appear?
        // Let's drop them all staggered.

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
        // Animate top card (index 0) away, then index 1, etc.

        cards.forEach((card, i) => {
            // Viewing time
            tl.to({}, { duration: 2.5 });

            // If not the very last card, animate it away
            // Actually, let's animate even the last one to clear, or keep it?
            // "Viewer want to see photos". 2.5s is good.

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
