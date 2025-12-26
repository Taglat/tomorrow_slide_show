export class AutoPlayManager {
    constructor({ state, transition, delay = 2500 }) {
        this.state = state;
        this.transition = transition;
        this.delay = delay;
        this.timer = null;
    }

    start() {
        if (this.state.state === "playing") return;
        this.state.setState("playing");
        this.loop();
    }

    stop() {
        this.state.setState("paused");
        clearTimeout(this.timer);
    }

    async loop() {
        if (this.state.state !== "playing") return;

        await this.transition.next();

        if (this.state.currentIndex >= this.transition.slides.length - 1) {
            this.stop();
            return;
        }

        this.timer = setTimeout(() => {
            this.loop();
        }, this.delay);
    }
}
