import gsap from "gsap";

export function SLIDE1({ section }) {
    return new Promise(resolve => {
        const tl = gsap.timeline({
            onComplete: resolve
        });

        tl.from(section.querySelector(".title"), {
            opacity: 0,
            y: 40,
            duration: 1
        });
    });
}
