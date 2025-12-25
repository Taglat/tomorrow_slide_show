import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE1({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE1");
        const title = section.querySelector(".title");
        const astana = section.querySelector("#astana_hub");
        const tomorrow = section.querySelector("#tomorrow_school");
        const textBlocks = section.querySelectorAll(".text-block");
        const systemRules = section.querySelector(".system-rules");
        const rules = section.querySelectorAll(".rule");

        // 1️⃣ подготовка текста
        prepareTitle(title);

        const chars = title.querySelectorAll(".char");

        // ❗ SAFETY: если chars пустой — выходим
        if (!chars.length) {
            console.warn("SLIDE1: chars not found");
            resolve();
            return;
        }

        // 2️⃣ RESET
        gsap.set(textBlocks[0], {
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

        if (systemRules) {
            gsap.set(systemRules, {
                opacity: 0,
                visibility: "visible",
                y: 30
            });
        }

        if (rules.length > 0) {
            gsap.set(rules, {
                opacity: 0,
                x: -20
            });
        }

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
        tl.to(textBlocks[0], {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "steps(4)"
        });

        // ───── Появление системных правил
        if (systemRules && rules.length > 0) {
            tl.to(systemRules, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "steps(6)"
            });

            tl.to(rules, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "steps(4)"
            }, "-=0.3");

            // ───── Пауза для чтения
            tl.to({}, { duration: 1.5 });
        }
    });
}
