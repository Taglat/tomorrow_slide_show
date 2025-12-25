import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE3({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE3");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const photos = section.querySelectorAll(".c_photo");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // RESET
        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(subtitle, { opacity: 0, y: 10 });
        gsap.set(photos, {
            opacity: 0,
            x: -50
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // Заголовок
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        });

        // Subtitle
        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.3
        }, "-=0.2");

        // Лента фото
        tl.to(photos, {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "steps(6)"
        }, "+=0.2");
    });
}
