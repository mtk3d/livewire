export default {
    stack: [],

    process(now) {
        this.stack.forEach(transition => {
            const isFinished = transition.animation.isFinished(now);
            if (isFinished) {
                transition.resolve();
                this.stack = this.stack.filter(singleTransition => singleTransition !== transition);
            }
        });
        if (this.stack.length !== 0) requestAnimationFrame(this.process.bind(this));
    },

    append(animation) {
        const isLoopRunning = this.stack.length !== 0;
        if (!isLoopRunning) requestAnimationFrame(this.process.bind(this));

        return new Promise(resolve => {
            this.stack.push({ animation, resolve });
        });
    },

    interruptFor(node, parentId) {
        const transition = this.stack.find(runningTransition => runningTransition.animation.key === parentId);

        if (transition) {
            console.log('interrupted');
            transition.resolve();
            this.stack = this.stack.filter(singleTransition => singleTransition.animation !== transition.animation);
            return transition.animation.interrupt(performance.now());
        }

        return null;
    }
}
