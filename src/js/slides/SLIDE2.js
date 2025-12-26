import gsap from "gsap";
import { prepareTitle } from "./utils";

export function SLIDE2({ section }) {
    return new Promise(resolve => {
        console.log("SLIDE2: Клубы");

        const title = section.querySelector(".title");
        const subtitle = section.querySelector(".subtitle");
        const header = section.querySelector(".clubs-header");
        const cards = section.querySelectorAll(".photo-card");

        prepareTitle(title);
        const chars = title.querySelectorAll(".char");

        // ─────────────────────────────
        // RESET (Initial State via JS to be sure)
        // ─────────────────────────────
        gsap.set(header, { opacity: 0, visibility: "visible" });
        gsap.set(chars, { opacity: 0, y: 20 });
        gsap.set(subtitle, { opacity: 0, y: 10 });

        gsap.set(cards, {
            opacity: 0,
            visibility: "visible", // Container is visible, but opacity 0
            scale: 0.9,
            display: "none" // Hide layout
        });

        const tl = gsap.timeline({ onComplete: resolve });

        // ─────────────────────────────
        // SHOW HEADER
        // ─────────────────────────────
        tl.to(header, { opacity: 1, duration: 0.1 }); // Container visible

        tl.to(chars, {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "steps(4)"
        });

        tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.3
        }, "-=0.2");

        // ─────────────────────────────
        // SLIDESHOW LOOP
        // ─────────────────────────────
        if (cards.length > 0) {
            cards.forEach((card, index) => {
                const isLast = index === cards.length - 1;

                // Show Card
                tl.set(card, { display: "flex" }); // Turn on layout
                tl.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });

                // Wait for viewing
                tl.to({}, { duration: 3.5 });

                // Hide Card (if not last, or even if last to loop? 
                // Let's hide all sequentially. User can see "blank" for a moment or next slide comes)

                // If we want a smooth transition, we overlay? 
                // But simplified: Hide current, then next loop iteration shows next.

                if (!isLast) {
                    tl.to(card, {
                        opacity: 0,
                        scale: 1.1,
                        duration: 0.4,
                        ease: "power2.in",
                        onComplete: () => gsap.set(card, { display: "none" })
                    });
                } else {
                    // Last card stays visible until resolve? 
                    // Or we can create an infinite loop here separate from main TL
                }
            });

            // Allow resolve after showing all photos once
        }
    });
}
