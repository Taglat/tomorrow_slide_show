import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE8({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE8 End");

        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const prompt = section.querySelector(".prompt");
        const arrow = section.querySelector(".arrow");
        const bg = section.querySelector(".u_pixel-bg");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        if (!chars.length) {
            console.warn("SLIDE9: title not split");
            resolve();
            return;
        }

        // ─────────────────────────────
        // RESET
        // ─────────────────────────────
        gsap.set(chars, {
            opacity: 0,
            y: 20
        });

        gsap.set([subtitle, prompt], {
            opacity: 0
        });

        gsap.set(bg, {
            opacity: 0
        });

        // ─────────────────────────────
        // BACKGROUND — включение портала
        // ─────────────────────────────
        tl.to(bg, {
            opacity: 1,
            duration: 0.6,
            ease: "steps(3)"
        });

        // ─────────────────────────────
        // TITLE — glitch / сигнал
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.25,
            ease: "steps(2)"
        });

        // ─────────────────────────────
        // SUBTITLE — мягко
        // ─────────────────────────────
        tl.to(subtitle, {
            opacity: 1,
            duration: 0.4,
            ease: "power1.out"
        }, "+=0.2");

        // ─────────────────────────────
        // PROMPT — появление команды
        // ─────────────────────────────
        tl.to(prompt, {
            opacity: 1,
            duration: 0.3,
            ease: "steps(2)"
        }, "+=0.3");

        // ─────────────────────────────
        // IDLE LOOP — мигание стрелки
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
