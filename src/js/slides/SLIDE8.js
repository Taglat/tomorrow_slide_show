import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE8({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE8: Happy New Year");

        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const prompt = section.querySelector(".prompt");
        const arrow = section.querySelector(".arrow");
        const bg = section.querySelector(".u_pixel-bg");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        if (!chars.length) {
            console.warn("SLIDE8: title not split");
            resolve();
            return;
        }

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, {
            opacity: 0,
            y: 50,
            scale: 0.5,
            color: "#ffffff"
        });

        gsap.set([prompt], {
            opacity: 0,
            y: 20
        });

        gsap.set(bg, {
            opacity: 0
        });

        // ─────────────────────────────
        // 1. BACKGROUND
        // ─────────────────────────────
        tl.to(bg, {
            opacity: 1,
            duration: 0.6,
            ease: "steps(3)"
        });

        // ─────────────────────────────
        // 2. TITLE (Explosive)
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: {
                from: "center",
                amount: 0.5
            },
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });

        // Festive Colors Loop
        gsap.to(chars, {
            color: gsap.utils.wrap(["#ff0000", "#00ff00", "#ffff00", "#00ffff"]),
            duration: 0.5,
            stagger: {
                each: 0.1,
                repeat: -1,
                yoyo: true
            }
        });

        // ─────────────────────────────
        // 4. PROMPT
        // ─────────────────────────────
        tl.to(prompt, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "steps(2)"
        }, "+=0.2");

        // ─────────────────────────────
        // 5. LOOP ARROW
        // ─────────────────────────────
        gsap.to(arrow, {
            opacity: 0,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)"
        });
    });
}
