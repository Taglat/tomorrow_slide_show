import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE7({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE7");

        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const stats = section.querySelectorAll(".stats li");
        const bg = section.querySelector(".u_pixel-bg");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        if (!chars.length) {
            console.warn("SLIDE7: title not split");
            resolve();
            return;
        }

        // ─────────────────────────────
        // RESET (очень спокойно)
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

        gsap.set(bg, {
            opacity: 0
        });

        // ─────────────────────────────
        // BACKGROUND — мягкий рассвет
        // ─────────────────────────────
        tl.to(bg, {
            opacity: 1,
            duration: 0.8,
            ease: "none"
        });

        // ─────────────────────────────
        // TITLE — медленно, по буквам
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(2)"
        }, "-=0.4");

        // ─────────────────────────────
        // SUBTITLE — после паузы
        // ─────────────────────────────
        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power1.out"
        }, "+=0.2");

        // ─────────────────────────────
        // STATS — одно за другим
        // ─────────────────────────────
        tl.to(stats, {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 0.3,
            ease: "steps(2)"
        }, "+=0.3");

        // ─────────────────────────────
        // IDLE — еле заметное дыхание
        // ─────────────────────────────
        gsap.to(section, {
            scale: 1.01,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    });
}
