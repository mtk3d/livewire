import animationLoop from './animationLoop';
import { createAnimation, ENTER, LEAVE } from './transitions';

export function handleAnimation (node, direction, interrupted) {
    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('wire:transition')) {
        const animation = createAnimation(node, direction, interrupted);
        return animationLoop.append(animation);
    }

    return new Promise(resolve => resolve());
}

export function handleAnimationInterruption(node) {
    const transitionNode = node.querySelector('[wire\\3Atransition]');
    return animationLoop.interruptFor(transitionNode, node.getAttribute('wire:id'));
}
