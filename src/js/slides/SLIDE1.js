import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE1({ section }) {
    return new Promise(resolve => {
        const title = section.querySelector(".title");
        const astana = section.querySelector("#astana_hub");
        const tomorrow = section.querySelector("#tomorrow_school");
        const photos = section.querySelectorAll(".c_photo");
        const textBlock = section.querySelector(".text-block");

        // 1️⃣ подготовка текста
        prepareTitle(title);

        const chars = title.querySelectorAll(".char");

        // ❗ SAFETY: если chars пустой — выходим
        if (!chars.length) {
            console.warn("SLIDE1: chars not found");
            resolve();
            return;
        }

        // 2️⃣ RESET (ЭТО БЫЛО ПРОПУЩЕНО)
        gsap.set(textBlock, {
            opacity: 1,
            visibility: "visible",
            scale: 1
        });

        gsap.set(chars, {
            opacity: 0,
            y: 20
        });

        gsap.set([astana, tomorrow], {
            opacity: 0,
            scale: 0,
            rotation: 0
        });

        gsap.set(photos, {
            opacity: 0,
            visibility: "visible",
            scale: 0.5,
            y: 50
        });

        // 3️⃣ TIMELINE
        const tl = gsap.timeline({
            onComplete: resolve
        });

        // ───── Заголовок
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        });

        // ───── Логотипы
        tl.to([astana, tomorrow], {
            opacity: 1,
            scale: 1,
            rotation: 360,
            stagger: 0.2,
            duration: 0.6,
            ease: "steps(8)"
        }, "-=0.2");

        // ───── Пауза
        tl.to({}, { duration: 0.5 });

        // ───── Уход текста
        tl.to(textBlock, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "steps(4)"
        });

        // ───── Фото
        tl.to(photos, {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "steps(8)"
        });

        // ───── Мерцание
        tl.to(photos, {
            opacity: 0.85,
            stagger: 0.05,
            yoyo: true,
            repeat: 1,
            duration: 0.1,
            ease: "steps(2)"
        });
    });
}
