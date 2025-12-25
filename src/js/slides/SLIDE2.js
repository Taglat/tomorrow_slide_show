import gsap from "gsap";

export function SLIDE2({ section }) {
    return new Promise(resolve => {
        const tl = gsap.timeline({
            onComplete: resolve
        });

        const title = section.querySelector(".title");

        tl.from(title, {
            opacity: 0,
            y: 40,
            duration: 10
        }).to(title, {
            scale: 10,
            duration: 6
        });
    });
}