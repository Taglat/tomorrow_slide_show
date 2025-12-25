import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE2({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE2");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const photos = section.querySelectorAll(".c_photo");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // RESET
        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(subtitle, { opacity: 0, y: 10, visibility: "visible" });
        gsap.set(photos, { opacity: 0, scale: 0.8 });

        const tl = gsap.timeline({ onComplete: resolve });

        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        });

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.3
        }, "-=0.2");

        tl.to(photos, {
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.5,
            ease: "steps(6)"
        }, "+=0.2");
    });
}
