export default class InterruptedTransition {
    constructor(interval, duration) {
        this.interval = 1 - interval;
        this.duration = duration;
    }
}
