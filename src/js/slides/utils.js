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

    // ❗ textContent работает даже если visibility:hidden
    const text = title.textContent.trim();

    if (!text) {
        console.warn("prepareTitle: empty textContent");
        return;
    }

    title.innerHTML = text
        .split("")
        .map(char => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");

    title.dataset.split = "true";
}
