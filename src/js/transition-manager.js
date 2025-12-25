import gsap from "gsap";

export class TransitionManager {
    constructor({ slides, track, animations, state }) {
        this.slides = slides;
        this.track = track;
        this.animations = animations;
        this.state = state;
    }

    async goTo(index, { skipAnimation = false } = {}) {
        if (this.state.isTransitioning) return;

        this.state.lock();

        // ⬇️ перемещение трека всегда есть
        await gsap.to(this.track, {
            y: -index * window.innerHeight,
            duration: skipAnimation ? 0.3 : 1,
            ease: "power2.inOut"
        });

        this.state.setIndex(index);

        // ⬇️ если skip — НЕ запускаем анимацию слайда
        if (!skipAnimation) {
            const slide = this.slides[index];
            const animation = this.animations[slide.id];

            if (animation) {
                await animation({ section: slide, instant: skipAnimation });
            }
        }

        this.state.unlock();
    }

    next(options) {
        this.goTo(
            Math.min(this.state.currentIndex + 1, this.slides.length - 1),
            options
        );
    }

    prev(options) {
        this.goTo(
            Math.max(this.state.currentIndex - 1, 0),
            options
        );
    }
}
