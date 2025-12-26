import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE5({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE5: Тимбилдинг");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const photos = section.querySelectorAll(".c_photo");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, {
            opacity: 0,
            scale: 0.5,
            y: -20,
            transformOrigin: "center center"
        });

        gsap.set(subtitle, { opacity: 0, y: 20 });

        // Remove old absolute positioning logic
        gsap.set(photos, {
            opacity: 0,
            visibility: "visible",
            scale: 0.5, // Start small
            rotation: () => gsap.utils.random(-10, 10), // A bit loose before snapping in
            y: 100
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // ─────────────────────────────
        // 1. TITLE CONSTRUCTION
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.4,
            ease: "back.out(1.5)"
        });

        // ─────────────────────────────
        // 2. BUILD THE TEAM (Mosaic Snap)
        // ─────────────────────────────
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            rotation: 0, // Snap to grid
            y: 0,
            stagger: {
                // grid: [3, 4], // Auto grid detection is hard here due to custom layout spans
                from: "center",
                amount: 0.6
            },
            duration: 0.8,
            ease: "elastic.out(1, 0.75)"
        }, "-=0.2");

        // ─────────────────────────────
        // 3. PROMISE (Subtitle)
        // ─────────────────────────────
        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2");

        // ─────────────────────────────
        // 4. HEARTBEAT (Unity)
        // ─────────────────────────────
        gsap.to(photos, {
            scale: 0.98,
            duration: 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: {
                from: "center",
                amount: 0.5
            }
        });

    });
}
