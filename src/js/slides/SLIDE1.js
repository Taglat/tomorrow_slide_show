import gsap from "gsap";

export function SLIDE1({ section }) {
    return new Promise(resolve => {
        const title = section.querySelector(".title");
        const astana = section.querySelector("#astana_hub");
        const tomorrow = section.querySelector("#tomorrow_school");
        const photos = section.querySelectorAll(".c_photo");
        const textBlock = section.querySelector(".text-block");

        // Разбиваем заголовок на символы
        const chars = title.innerText.split("");
        title.innerHTML = chars
            .map(char => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
            .join("");

        const charEls = title.querySelectorAll(".char");

        const tl = gsap.timeline({
            onComplete: resolve
        });

        // Заголовок посимвольно
        tl.from(charEls, {
            opacity: 0,
            y: 20,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        });

        // Логотипы
        tl.from([astana, tomorrow], {
            opacity: 0,
            scale: 0,
            rotation: 360,
            stagger: 0.2,
            ease: "steps(8)",
            duration: 0.6
        }, "-=0.2");

        // Пауза
        tl.to({}, { duration: 0.5 });

        // Текстовый блок исчезает
        tl.to(textBlock, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "steps(4)"
        });

        // Фото появляются поочередно
        tl.from(photos, {
            opacity: 0,
            scale: 0.5,
            y: 50,
            stagger: 0.15,
            ease: "steps(8)",
            duration: 0.6
        });

        // Мерцание
        tl.to(photos, {
            opacity: 0.85,
            stagger: 0.05,
            yoyo: true,
            repeat: 1,
            ease: "steps(2)",
            duration: 0.1
        });
    });
}