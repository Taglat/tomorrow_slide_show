import gsap from "gsap";

export function START({ section }) {
    return new Promise(resolve => {
        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");

        // Разбиваем заголовок на символы
        const chars = title.innerText.split("");
        title.innerHTML = chars
            .map(char => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
            .join("");

        const charEls = title.querySelectorAll(".char");

        const tl = gsap.timeline({
            onComplete: resolve
        });

        // TITLE: pixel appear
        tl.from(charEls, {
            opacity: 0,
            y: 20,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        })

        // TITLE: micro jitter
        tl.to(charEls, {
            y: () => gsap.utils.random(-2, 2),
            x: () => gsap.utils.random(-2, 2),
            duration: 0.15,
            stagger: {
                each: 0.02,
                yoyo: true,
                repeat: 1
            },
            ease: "steps(2)"
        }).from(subtitle, {
            scale: 0.8,
            duration: 0.4,
            ease: "steps(3)"
        }, "");



        // IDLE LOOP (после resolve — autoplay может идти дальше)
        gsap.to(subtitle, {
            opacity: 0.3,
            repeat: -1,
            yoyo: true,
            duration: 0.6,
            ease: "steps(2)"
        });

    });
}
