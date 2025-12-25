import gsap from "gsap";

export function START({ section }) {
    return new Promise(resolve => {
        const tl = gsap.timeline({
            onComplete: resolve
        });

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const btn = section.querySelector("#start-btn");

        // title
        tl.from(title, {
            opacity: 0,
            y: 40,
            duration: 0.6,
        });

        tl.to(title, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            delay: 1,
        });

        // subtitle
        tl.from(subtitle, {
            scale: 0,
            rotation: -10,
            duration: 0.5,
        });

        tl.to(subtitle, {
            opacity: 0,
            duration: 0.3,
            delay: 1,
        });

        // btn
        tl.from(btn, {
            x: -100,
            opacity: 0,
            duration: 0.6,
        });

        return tl;
    })
};
