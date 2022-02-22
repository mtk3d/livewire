import animationLoop from './animationLoop';
import { createAnimation, ENTER, LEAVE } from './transitions';

export function handleAnimation (node, direction, interrupted, onFinishedCallback) {
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('wire:transition')) {
        const animation = createAnimation(node, direction, interrupted, onFinishedCallback);
        animationLoop.append(animation);
        return true;
    }

    return false;
}

export function handleAnimationInterruption(node) {
    const transitionNode = node.querySelector('[wire\\3Atransition]');
    return animationLoop.interruptFor(transitionNode, node.getAttribute('wire:id'));
}
