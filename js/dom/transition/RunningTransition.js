import InterruptedTransition from './InterruptedTransition';

export default class RunningTransition {
    constructor(key, duration, end, clearCallback) {
        this.key = key;
        this.duration = duration;
        this.end = end;
        this.clearCallback = clearCallback;
    }

    start() {
        return this.end - this.duration;
    }

    currentDuration(now) {
        return now - this.start();
    }

    currentInterval(now) {
        const currentDuration = this.currentDuration(now);
        return currentDuration / this.duration;
    }

    interrupt(now) {
        this.clearCallback();
        return new InterruptedTransition(this.currentInterval(now), this.currentDuration(now));
    }

    isFinished(now) {
        const isFinished = this.end <= now;
        console.log(this.end, now);
        if(isFinished) {
            this.clearCallback();
            console.log('finished')
        }
        return isFinished;
    }
}
