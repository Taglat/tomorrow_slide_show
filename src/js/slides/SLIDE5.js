import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE5({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE5");

        const tl = gsap.timeline({
            onComplete: resolve
        });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const photos = section.querySelectorAll(".c_photo");

        // ─────────────────────────────
        // PREPARE
        // ─────────────────────────────
        prepareTitle(title);

        const chars = title.querySelectorAll(".char");

        if (!chars.length || !photos.length) {
            console.warn("SLIDE6: missing elements");
            resolve();
            return;
        }

        // RESET
        gsap.set(chars, {
            opacity: 0,
            y: 20
        });

        gsap.set(subtitle, {
            opacity: 0,
            scale: 0.8
        });

        gsap.set(photos, {
            position: "absolute",
            opacity: 0,
            scale: 0.6,
            x: () => gsap.utils.random(-300, 300),
            y: () => gsap.utils.random(-200, 200),
            rotation: () => gsap.utils.random(-30, 30)
        });

        // ─────────────────────────────
        // TITLE (быстро, без акцента)
        // ─────────────────────────────
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.015,
            duration: 0.25,
            ease: "steps(3)"
        });

        // ─────────────────────────────
        // CHAOTIC ENTRY (движение)
        // ─────────────────────────────
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            x: () => gsap.utils.random(
                80,
                window.innerWidth - 260
            ),
            y: () => gsap.utils.random(
                120,
                window.innerHeight - 220
            ),
            stagger: 0.15,
            duration: 0.6,
            ease: "steps(6)"
        }, "-=0.1");

        // ─────────────────────────────
        // GATHER (co-op moment)
        // ─────────────────────────────
        tl.to(photos, {
            x: (i) => (i - (photos.length - 1) / 2) * 60,
            y: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "steps(4)"
        });

        // ─────────────────────────────
        // SUBTITLE (после сборки)
        // ─────────────────────────────
        tl.to(subtitle, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "steps(3)"
        });

        // ─────────────────────────────
        // MICRO IDLE (жизнь)
        // ─────────────────────────────
        gsap.to(photos, {
            y: "+=6",
            yoyo: true,
            repeat: -1,
            stagger: {
                each: 0.2,
                from: "center"
            },
            duration: 0.6,
            ease: "steps(2)"
        });
    });
}
