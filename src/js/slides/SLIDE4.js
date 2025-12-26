import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE4({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE4: Спортивные турниры (Slots & Cycle)");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const cards = section.querySelectorAll(".sport-card");

        console.log("SLIDE4 cards found:", cards.length);

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, { opacity: 0, y: 50, rotationX: -90 });
        gsap.set(subtitle, { opacity: 0, y: 20 });

        // Define 3 slots positions (absolute)
        // Card width 300px + gap 30px = 330px stride
        const SLOTS = [-330, 0, 330];

        // Prepare ALL cards: Absolute center, invisible, huge
        gsap.set(cards, {
            position: "absolute",
            left: "50%",
            top: 0,
            xPercent: -50, // Center anchor

            autoAlpha: 0, // handles visibility: hidden
            scale: 3,
            z: 500,
            y: () => gsap.utils.random(-100, 100),
            // Initial x target for first 3 is slot position, others random/center
            x: (i) => (i < 3) ? SLOTS[i] + gsap.utils.random(-50, 50) : 0,
            rotation: () => gsap.utils.random(-45, 45)
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // ─────────────────────────────
        // 1. TITLE
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "back.out(1.5)"
        });

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: ANIMATIONS.SUBTITLE_DURATION
        }, ANIMATIONS.SUBTITLE_DELAY);

        // ─────────────────────────────
        // 2. SHOW INITIAL 3 CARDS
        // ─────────────────────────────
        for (let i = 0; i < 3; i++) {
            if (cards[i]) {
                tl.to(cards[i], {
                    autoAlpha: 1,
                    scale: 1,
                    z: 0,
                    x: SLOTS[i], // Snap to slot
                    y: 0,
                    rotation: () => gsap.utils.random(-3, 3),
                    duration: 0.8,
                    ease: "power2.out"
                }, i === 0 ? "-=0.2" : "-=0.6"); // Slight overlap
            }
        }

        // ─────────────────────────────
        // 3. CYCLE REMAINING CARDS
        // ─────────────────────────────
        const totalCards = cards.length;
        if (totalCards > 3) {
            let slotIndex = 0;

            for (let i = 3; i < totalCards; i++) {
                const newCard = cards[i];
                const cardToRemove = cards[i - 3]; // cyclical replacement: 3 replaces 0, 4 replaces 1...
                const targetSlotX = SLOTS[slotIndex % 3];

                // a) Animate OUT old card
                tl.to(cardToRemove, {
                    y: 200,
                    autoAlpha: 0,
                    scale: 0.5,
                    rotation: gsap.utils.random(-20, 20),
                    duration: 0.5,
                    ease: "power1.in"
                }, "+=0.8"); // View time before swap starts

                // b) Animate IN new card
                tl.fromTo(newCard,
                    {
                        autoAlpha: 0,
                        scale: 3,
                        z: 500,
                        x: targetSlotX + gsap.utils.random(-50, 50),
                        y: gsap.utils.random(-100, 100),
                        rotation: gsap.utils.random(-45, 45)
                    },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        z: 0,
                        x: targetSlotX,
                        y: 0,
                        rotation: gsap.utils.random(-3, 3),
                        duration: 0.8,
                        ease: "power2.out"
                    },
                    "-=0.2" // Overlap slightly with exit
                );

                slotIndex++;
            }
        }

        // ─────────────────────────────
        // 4. PAUSE FOR VIEWING FINAL SET
        // ─────────────────────────────
        tl.to({}, { duration: 2.0 });

    });
}
