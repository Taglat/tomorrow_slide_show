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
        if (rulesTitle) prepareTitle(rulesTitle);

        const chars = title.querySelectorAll(".char");
        const ruleChars = rulesTitle ? rulesTitle.querySelectorAll(".char") : [];

        // ❗ SAFETY: если chars пустой — выходим
        if (!chars.length) {
            console.warn("SLIDE1: chars not found");
            resolve();
            return;
        }

        // 2️⃣ RESET
        gsap.set(textBlocks[0], {
            autoAlpha: 1,
            scale: 1
        });

        gsap.set(chars, {
            autoAlpha: 0,
            y: 20
        });

        gsap.set([astana, tomorrow], {
            autoAlpha: 0,
            scale: 0,
            rotation: 0
        });

        if (systemRules) {
            gsap.set(systemRules, {
                autoAlpha: 0,
                y: 0
            });
        }

        if (rulesTitle) {
            gsap.set(ruleChars, { autoAlpha: 0, y: 10 });
        }

        if (rules.length > 0) {
            gsap.set(rules, {
                autoAlpha: 0,
                x: -30,
                y: 20,
                scale: 0.95
            });
        }

        // ... photos reset ...
        if (photosGeneral) {
            gsap.set(photosGeneral, { display: "none", autoAlpha: 0 });
            gsap.set(photoItemsGeneral, { autoAlpha: 0, y: 20 });
        }
        if (photosStuff) {
            gsap.set(photosStuff, { display: "none", autoAlpha: 0 });
            gsap.set(photoItemsStuff, { autoAlpha: 0, y: 20 });
        }

        // 3️⃣ TIMELINE
        const tl = gsap.timeline({
            onComplete: resolve
        });

        // ───── Заголовок
        tl.to(chars, {
            autoAlpha: 1,
            y: 0,
            stagger: ANIMATIONS.TITLE_STAGGER,
            duration: ANIMATIONS.TITLE_DURATION,
            ease: ANIMATIONS.EASE_STEPS_TEXT
        });

        // ───── Логотипы
        tl.to([astana, tomorrow], {
            autoAlpha: 1,
            scale: 1,
            rotation: 360,
            stagger: 0.2,
            duration: 0.6,
            ease: "back.out(1.7)" // Changed from steps(8) for smoothness
        }, ANIMATIONS.SUBTITLE_DELAY);

        // ───── Пауза
        tl.to({}, { duration: 0.5 });

        // ───── Уход текста
        tl.to(textBlocks[0], {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.in"
        });

        // ───── Появление системных правил
        if (systemRules && rules.length > 0) {
            console.log("SLIDE1: Showing Rules...");
            // Smoothly show the parent container first
            if (textBlocks[1]) {
                tl.to(textBlocks[1], {
                    autoAlpha: 1,
                    duration: 0.5
                });
            }

            // IMPORTANT: If systemRules was hidden in reset, we MUST show it
            tl.to(systemRules, { autoAlpha: 1, duration: 0.1 }, "<");

            if (rulesTitle && ruleChars.length > 0) {
                tl.to(ruleChars, {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.03,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2");
            } else if (rulesTitle) {
                tl.to(rulesTitle, {
                    autoAlpha: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.5)"
                }, "-=0.2");
            }

            tl.to(rules, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                stagger: 0.4,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.3");

            // ───── Пауза для чтения
            tl.to({}, { duration: 1.5 });

            // ───── Скрытие правил
            tl.to([systemRules, rulesTitle], {
                autoAlpha: 0,
                y: -20,
                duration: 0.5
            });
            tl.to(rules, { autoAlpha: 0, duration: 0.3 }, "<");
            tl.set([systemRules, rulesTitle, rules], { display: "none" });

            // ───── Появление обычных фото (Life, Work, etc)
            if (photosGeneral && photoItemsGeneral.length > 0) {
                console.log("SLIDE1: Showing General Photos...");
                tl.set(photosGeneral, { display: "flex", autoAlpha: 0 });
                tl.to(photosGeneral, { autoAlpha: 1, duration: 0.5 });

                tl.to(photoItemsGeneral, {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.6,
                    duration: 1.0,
                    ease: ANIMATIONS.EASE_OUT
                });

                // Viewing time
                tl.to({}, { duration: 3.0 });

                // Hide General Photos
                tl.to(photoItemsGeneral, {
                    autoAlpha: 0,
                    y: -20,
                    duration: 0.5,
                    stagger: 0.1
                });
                tl.set(photosGeneral, { display: "none" });
            }

            // ───── Появление фото стаффа (Staff)
            if (photosStuff && photoItemsStuff.length > 0) {
                console.log("SLIDE1: Showing Staff Photos...");
                tl.set(photosStuff, { display: "flex", autoAlpha: 0 });
                tl.to(photosStuff, { autoAlpha: 1, duration: 0.5 });

                tl.to(photoItemsStuff, {
                    autoAlpha: 1,
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
