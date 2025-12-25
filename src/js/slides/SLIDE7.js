import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE7({ section }) {
    return new Promise(resolve => {
        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const photos = section.querySelectorAll(".party-photo");
        const bg = section.querySelector(".u_pixel-bg");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        if (!chars.length || !photos.length) {
            console.warn("SLIDE7: missing elements");
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
            scale: 0.5,
            rotation: () => gsap.utils.random(-20, 20),
            x: () => gsap.utils.random(0, window.innerWidth - 200),
            y: () => gsap.utils.random(0, window.innerHeight - 160)
        });

        // ─────────────────────────────
        // TITLE — резкий вход
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.01,
            duration: 0.25,
            ease: "steps(4)"
        });

        // ─────────────────────────────
        // PARTY PHOTOS — взрыв
        // ─────────────────────────────
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: "steps(6)"
        }, "-=0.1");

        // ─────────────────────────────
        // STROBE BACKGROUND (дискотека)
        // ─────────────────────────────
        tl.to(bg, {
            backgroundColor: "#ff00ff",
            repeat: 6,
            yoyo: true,
            duration: 0.08,
            ease: "steps(1)"
        }, "-=0.3");

        // ─────────────────────────────
        // PHOTOS DANCE (ритм)
        // ─────────────────────────────
        tl.to(photos, {
            y: "+=20",
            rotation: () => gsap.utils.random(-10, 10),
            stagger: {
                each: 0.08,
                from: "random"
            },
            duration: 0.2,
            yoyo: true,
            repeat: 3,
            ease: "steps(2)"
        });

        // ─────────────────────────────
        // SUBTITLE — после пика
        // ─────────────────────────────
        tl.to(subtitle, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "steps(3)"
        });

        // ─────────────────────────────
        // IDLE PARTY LOOP (жизнь)
        // ─────────────────────────────
        gsap.to(photos, {
            y: "+=10",
            rotation: () => gsap.utils.random(-5, 5),
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            stagger: {
                each: 0.1,
                from: "random"
            },
            ease: "steps(2)"
        });
    });
}
