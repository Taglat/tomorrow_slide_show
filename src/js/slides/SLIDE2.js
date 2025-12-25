import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE2({ section }) {
    return new Promise(resolve => {
        const tl = gsap.timeline({ onComplete: resolve });

        const title = section.querySelector(".title");
        const rules = section.querySelectorAll(".rule");
        const icons = section.querySelectorAll(".icon");

        prepareTitle(title);

        const chars = title.querySelectorAll(".char");

        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(rules, { opacity: 0, x: -20 });
        gsap.set(icons, { scale: 0 });

        // TITLE
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: "steps(3)"
        });

        // RULES
        tl.to(rules, {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.3,
            ease: "steps(3)"
        });

        // ICONS
        tl.to(icons, {
            scale: 1,
            stagger: 0.15,
            duration: 0.2,
            ease: "steps(2)"
        });

        // PULSE
        tl.to(".system-rules", {
            opacity: 0.85,
            yoyo: true,
            repeat: 1,
            duration: 0.15,
            ease: "steps(2)"
        });
    });
}