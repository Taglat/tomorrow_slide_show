import gsap from "gsap";

export function spawnSparkles(section) {
    const container = section.querySelector(".sparkles");

    for (let i = 0; i < 8; i++) {
        const s = document.createElement("span");
        container.appendChild(s);

        gsap.set(s, {
            x: gsap.utils.random(100, 600),
            y: gsap.utils.random(50, 300)
        });

        gsap.fromTo(
            s,
            { opacity: 0, scale: 0 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "steps(2)",
                onComplete: () => s.remove()
            }
        );
    }
}

export function startSnow(section) {
    const container = section.querySelector(".snow");

    for (let i = 0; i < 20; i++) {
        const flake = document.createElement("span");
        container.appendChild(flake);

        gsap.set(flake, {
            x: gsap.utils.random(0, window.innerWidth),
            y: -10
        });

        gsap.to(flake, {
            y: window.innerHeight + 20,
            duration: gsap.utils.random(4, 8),
            repeat: -1,
            delay: gsap.utils.random(0, 5),
            ease: "steps(20)"
        });
    }
}

export function splitTextToSpans(el) {
    const text = el.innerText;
    el.innerHTML = "";

    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        el.appendChild(span);
    });
}
