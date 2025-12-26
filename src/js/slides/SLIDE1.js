import gsap from "gsap";
import { prepareTitle } from "./utils";
import { ANIMATIONS } from "../config";

export function SLIDE1({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE1: Знакомство с Tomorrow School");
        const title = section.querySelector(".title");
        const astana = section.querySelector("#astana_hub");
        const tomorrow = section.querySelector("#tomorrow_school");
        const textBlocks = section.querySelectorAll(".text-block");
        const systemRules = section.querySelector(".system-rules");
        const rulesTitle = section.querySelector(".rules-title");
        const rules = section.querySelectorAll(".rule");
        const photosGeneral = section.querySelector(".photos");
        const photosStuff = section.querySelector(".photos_stuff");
        const photoItemsGeneral = photosGeneral ? photosGeneral.querySelectorAll(".photo-item") : [];
        const photoItemsStuff = photosStuff ? photosStuff.querySelectorAll(".photo-item") : [];

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
                y: 0
            });
        }

        if (rulesTitle) {
            gsap.set(rulesTitle, { opacity: 0, scale: 0.8, y: 20 });
        }

        if (rules.length > 0) {
            gsap.set(rules, {
                opacity: 0,
                x: -50,
                scale: 0.9
            });
        }

        // RESET PHOTOS
        if (photosGeneral) {
            gsap.set(photosGeneral, { display: "none", opacity: 0 });
            gsap.set(photoItemsGeneral, { opacity: 0, y: 20 });
        }
        if (photosStuff) {
            gsap.set(photosStuff, { display: "none", opacity: 0 });
            gsap.set(photoItemsStuff, { opacity: 0, y: 20 });
        }

        // 3️⃣ TIMELINE
        const tl = gsap.timeline({
            onComplete: resolve
        });

        // ───── Заголовок
        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: ANIMATIONS.TITLE_STAGGER,
            duration: ANIMATIONS.TITLE_DURATION,
            ease: ANIMATIONS.EASE_STEPS_TEXT
        });

        // ───── Логотипы
        tl.to([astana, tomorrow], {
            opacity: 1,
            scale: 1,
            rotation: 360,
            stagger: 0.2,
            duration: 0.6,
            ease: "steps(8)"
        }, ANIMATIONS.SUBTITLE_DELAY);

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
            // FIX: Делаем родительский контейнер видимым
            if (textBlocks[1]) {
                tl.set(textBlocks[1], {
                    opacity: 1,
                    visibility: "visible"
                });
            }

            tl.to(systemRules, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            if (rulesTitle) {
                tl.to(rulesTitle, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.2");
            }

            tl.to(rules, {
                opacity: 1,
                x: 0,
                scale: 1,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.2");

            // ───── Пауза для чтения
            tl.to({}, { duration: 1.5 });

            // ───── Скрытие правил
            tl.to([systemRules, rulesTitle], {
                opacity: 0,
                y: -20,
                duration: 0.5
            });
            tl.to(rules, { opacity: 0, duration: 0.3 }, "<");
            tl.set([systemRules, rulesTitle, rules], { display: "none" }); // Remove from flow

            // ───── Появление обычных фото (Life, Work, etc)
            if (photosGeneral && photoItemsGeneral.length > 0) {
                tl.set(photosGeneral, { display: "flex", visibility: "visible" });
                tl.to(photosGeneral, { opacity: 1, duration: 0.5 });

                tl.to(photoItemsGeneral, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.6, // "не торопи" -> slow stagger
                    duration: 1.0,
                    ease: ANIMATIONS.EASE_OUT
                });

                // Viewing time
                tl.to({}, { duration: 3.0 });

                // Hide General Photos
                tl.to(photoItemsGeneral, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    stagger: 0.1
                });
                tl.set(photosGeneral, { display: "none" });
            }

            // ───── Появление фото стаффа (Staff)
            if (photosStuff && photoItemsStuff.length > 0) {
                tl.set(photosStuff, { display: "flex", visibility: "visible" });
                tl.to(photosStuff, { opacity: 1, duration: 0.5 });

                tl.to(photoItemsStuff, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.6,
                    duration: 1.0,
                    ease: ANIMATIONS.EASE_OUT
                });

                // Viewing time
                tl.to({}, { duration: 3.0 });
            }
        }
    });
}
