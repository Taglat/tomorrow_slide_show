import gsap from "gsap";

export class AudioController {
    constructor(src) {
        this.audio = new Audio(src);
        this.audio.loop = true;
        this.fadeOutTween = null;
    }

    play() {
        if (this.fadeOutTween) {
            this.fadeOutTween.kill();
            this.fadeOutTween = null;
        }

        // If it was faded out, reset volume before playing
        if (this.audio.volume < 1) {
            this.audio.volume = 1;
        }

        this.audio.play().catch(e => {
            console.warn("Audio play blocked by browser. User must interact first.", e);
        });
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    fadeOut(duration = 3) {
        if (this.fadeOutTween) return; // Already fading

        this.fadeOutTween = gsap.to(this.audio, {
            volume: 0,
            duration: duration,
            ease: "none",
            onComplete: () => {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.audio.volume = 1; // Reset volume for next time
                this.fadeOutTween = null;
            }
        });
    }
}
