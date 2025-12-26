import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE7({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE7: Статистика");

        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const stats = section.querySelectorAll(".stats li");
        const photos = section.querySelectorAll(".summary-photos .c_photo");
        const bg = section.querySelector(".u_pixel-bg");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, {
            opacity: 0,
            y: 10
        });

        gsap.set(subtitle, {
            opacity: 0,
            y: 10
        });

        gsap.set(stats, {
            opacity: 0,
            y: 10
        });

        gsap.set(photos, {
            opacity: 0,
            scale: 0.8,
            rotation: 0
        });

        gsap.set(bg, {
            opacity: 0
        });

        // ─────────────────────────────
        // BACKGROUND
        // ─────────────────────────────
        tl.to(bg, {
            opacity: 1,
            duration: 0.8,
            ease: "none"
        });

        // ─────────────────────────────
        // CONTENT
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: ANIMATIONS.TITLE_STAGGER,
            duration: ANIMATIONS.TITLE_DURATION,
            ease: ANIMATIONS.EASE_STEPS_TEXT
        }, "-=0.4");

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: ANIMATIONS.SUBTITLE_DURATION,
            ease: ANIMATIONS.EASE_OUT
        }, "+=0.1");

        tl.to(stats, {
            opacity: 1,
            y: 0,
            stagger: 0.2, // List items
            duration: 0.5,
            ease: "power2.out"
        }, "+=0.2");

        // ─────────────────────────────
        // PHOTOS GRID REVEAL
        // ─────────────────────────────
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            stagger: {
                amount: 0.8,
                grid: [3, 3],
                from: "center"
            },
            duration: 0.6,
            ease: ANIMATIONS.EASE_BACK
        }, "-=0.2");

        // ─────────────────────────────
        // IDLE
        // ─────────────────────────────
        gsap.to(section, {
            scale: 1.01,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

        // Add pause for viewing
        tl.to({}, { duration: 2.0 });
    });
}
