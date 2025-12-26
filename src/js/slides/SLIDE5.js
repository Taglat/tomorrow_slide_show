import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE5({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE5: Тимбилдинг (Ticker L->R)");

        const title = section.querySelector(".title");
        // Subtitle removed from HTML
        const teamField = section.querySelector(".team-field");
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

        // Photos: Visible but transparent initially
        gsap.set(photos, {
            autoAlpha: 0,
            scale: 0.8,
            rotation: 0
        });

        // Timer for scrolling
        gsap.set(teamField, {
            xPercent: -33.333 // Start shifted left
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // ─────────────────────────────
        // 1. TITLE
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: ANIMATIONS.TITLE_STAGGER,
            duration: ANIMATIONS.TITLE_DURATION,
            ease: "back.out(1.5)"
        });

        // ─────────────────────────────
        // 2. SHOW STRIP (Fade In)
        // ─────────────────────────────
        tl.to(photos, {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");

        // ─────────────────────────────
        // 3. START TICKER (Left -> Right)
        // ─────────────────────────────
        // Move from -33.333% to 0% creates rightward motion >>>
        gsap.to(teamField, {
            xPercent: 0,
            ease: "none",
            duration: 8, // Faster! (was 20)
            repeat: -1
        });

        // ─────────────────────────────
        // 4. WATCH TIME
        // ─────────────────────────────
        tl.to({}, { duration: 5.0 }); // Let it run for 5 seconds before next slide

    });
}
