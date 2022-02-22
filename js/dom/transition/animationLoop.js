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
        console.log('append');
        if (!isLoopRunning) requestAnimationFrame(this.process.bind(this));
        this.stack.push(animation);
    },

    interruptFor(node, parentId) {
        const animation = this.stack.find(a => a.key === parentId);
        console.log('trying to interrupt')
        if (animation) {
            console.log('interrupted');
            this.stack = this.stack.filter(a => a !== animation);
            return animation.interrupt(performance.now());
        }

        return null;
    }
}
