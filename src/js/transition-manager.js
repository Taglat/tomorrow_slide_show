import gsap from "gsap";

export class TransitionManager {
    constructor({ slides, track, animations, state }) {
        this.slides = slides;
        this.track = track;
        this.animations = animations;
        this.state = state;
    }

    async goTo(index) {
        if (this.state.isTransitioning) return;

        this.state.lock();

        await gsap.to(this.track, {
            y: -index * window.innerHeight,
            duration: 1,
            ease: "power2.inOut"
        });

        this.state.setIndex(index);

        const slide = this.slides[index];
        const animation = this.animations[slide.id];

        if (animation) {
            await animation({ section: slide });
        }

        this.state.unlock();
    }

    next() {
        this.goTo(
            Math.min(this.state.currentIndex + 1, this.slides.length - 1)
        );
    }

    prev() {
        this.goTo(
            Math.max(this.state.currentIndex - 1, 0)
        );
    }
}
