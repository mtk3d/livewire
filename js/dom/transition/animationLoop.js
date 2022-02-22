export default {
    stack: [],

    process(now) {
        this.stack.forEach(animation => {
            const isFinished = animation.isFinished(now);
            if (isFinished) {
                this.stack = this.stack.filter(a => a !== animation);
            }
        });
        if (this.stack.length !== 0) requestAnimationFrame(this.process.bind(this));
    },

    append(animation) {
        const isLoopRunning = this.stack.length !== 0;
        if (!isLoopRunning) requestAnimationFrame(this.process.bind(this));
        this.stack.push(animation);
    },

    interruptFor(node, parentId) {
        const animation = this.stack.find(a => a.key === parentId);
        if (animation) {
            this.stack = this.stack.filter(a => a !== animation);
            return animation.interrupt(performance.now());
        }

        return null;
    }
}
