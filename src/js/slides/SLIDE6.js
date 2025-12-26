import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE6({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE6 Праздники (Ticker R->L)");

        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const partyPhotos = section.querySelector(".party-photos");
        const photos = section.querySelectorAll(".c_photo");
        const bg = section.querySelector(".u_pixel-bg");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        if (!chars.length || !photos.length) {
            console.warn("SLIDE6: missing elements");
            resolve();
            return;
        }

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, { opacity: 0, y: 30 });
        gsap.set(subtitle, { opacity: 0, scale: 0.7 });

        gsap.set(photos, {
            opacity: 0,
            scale: 0.8,
            rotation: () => gsap.utils.random(-8, 8)
        });

        // Start at 0 for R->L motion
        gsap.set(partyPhotos, {
            xPercent: 0
        });

        // ─────────────────────────────
        // 1. TITLE & SUBTITLE (Synced)
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.01,
            duration: 0.25,
            ease: ANIMATIONS.EASE_STEPS_TEXT
        });

        tl.to(subtitle, {
            opacity: 1,
            scale: 1,
            duration: ANIMATIONS.SUBTITLE_DURATION,
            ease: ANIMATIONS.EASE_OUT
        }, "<0.1"); // Sync tightly

        // ─────────────────────────────
        // 2. BACKGROUND STROBE (One shot)
        // ─────────────────────────────
        tl.to(bg, {
            backgroundColor: "#ff00ff",
            repeat: 5,
            yoyo: true,
            duration: 0.05,
            ease: "steps(1)"
        }, "-=0.2");

        // ─────────────────────────────
        // 3. PHOTOS REVEAL
        // ─────────────────────────────
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.out"
        }, "-=0.2");

        // ─────────────────────────────
        // 4. START TICKER (Right -> Left)
        // ─────────────────────────────
        // Move from 0% to -33.333% creates leftward motion <<<
        gsap.to(partyPhotos, {
            xPercent: -33.333,
            ease: "none",
            duration: 20,
            repeat: -1
        });

        // Add pause for viewing
        tl.to({}, { duration: 2.0 });

    });
}
