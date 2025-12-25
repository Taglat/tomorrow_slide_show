import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE5({ section }) {
    return new Promise(resolve => {
        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const photos = section.querySelectorAll(".sport-photo");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // RESET
        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(subtitle, { opacity: 0 });
        gsap.set(photos, {
            opacity: 0,
            scale: 0.6,
            y: 40
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
            duration: 0.3
        }, "-=0.2");

        // Фото — ударной волной
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: {
                each: 0.08,
                from: "center"
            },
            duration: 0.35,
            ease: "steps(6)"
        }, "+=0.1");
    });
}
