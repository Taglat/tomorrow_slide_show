import gsap from "gsap";

export function splitTextToSpans(el) {
    const text = el.innerText;
    el.innerHTML = "";

    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        el.appendChild(span);
    });
}

export function prepareTitle(title) {
    if (!title || title.dataset.split === "true") return;

    // textContent — безопасно для hidden
    const text = title.textContent.trim();

    if (!text) {
        console.warn("prepareTitle: empty textContent");
        return;
    }

    const words = text.split(" ");

    title.innerHTML = words
        .map(word => {
            const chars = word
                .split("")
                .map(char => `<span class="char">${char}</span>`)
                .join("");

            return `<span class="word">${chars}</span>`;
        })
        .join(`<span class="space">&nbsp;</span>`);

    title.dataset.split = "true";
}
