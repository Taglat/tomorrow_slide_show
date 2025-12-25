export class StateManager {
    constructor() {
        this.state = "idle"; // idle | playing | paused
        this.currentIndex = 0;
        this.isTransitioning = false; // 🔒 БЛОКИРОВКА

        this.listeners = new Set();
    }

    get snapshot() {
        return {
            state: this.state,
            currentIndex: this.currentIndex,
            isTransitioning: this.isTransitioning,
        };
    }

    subscribe(fn) {
        this.listeners.add(fn);
        fn(this.snapshot);
        return () => this.listeners.delete(fn);
    }

    notify() {
        this.listeners.forEach(fn => fn(this.snapshot));
    }

    setState(state) {
        this.state = state;
        this.notify();
    }

    setIndex(index) {
        this.currentIndex = index;
        this.notify();
    }

    lock() {
        this.isTransitioning = true;
        this.notify();
    }

    unlock() {
        this.isTransitioning = false;
        this.notify();
    }
}
