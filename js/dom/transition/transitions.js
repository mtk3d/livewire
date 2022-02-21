import RunningTransition from './RunningTransition';

const style = document.createElement('style');
style.type = 'text/css';
document.head.appendChild(style);

const randomString = () => (Math.random() + 1).toString(36).substring(7);

export const ENTER = 1;
export const LEAVE = 0;

export const createKeyframes = (duration, transition, a, b) => {
    // Name contains random string to not overwrite other keyframes
    const name = 'transition_' + randomString();
    // Like "60FPS"
    const step = 1000 / 60 / duration;
    let keyframes = `@keyframes ${name} {\n`;
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * p;
        keyframes += `${p * 100}% { ${transition(t)} } \n`;
    }
    keyframes += `100% { ${transition(b)} }\n}`;

    style.sheet.insertRule(keyframes, style.length);

    return name;
}

export const fly = (node, opts) => t => {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;

    const x = opts.x ?? 0;
    const y = opts.y ?? 0;

    return `transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (1 - t)}`;
}

export const createAnimation = (node, direction, interrupted = null) => {
    let duration = 2000;
    let startFrom = 1 - direction;
    const now = performance.now();
    const end = now + duration;

    if (interrupted) {
        startFrom = interrupted.interval;
        duration = interrupted.duration;
    }

    const animation = fly(node, { x: 400 });
    const keyframes = createKeyframes(duration, animation, startFrom, direction);
    node.style.animation = `${keyframes} ${duration}ms linear both`;

    const parentId = node.closest('[wire\\3Aid]').getAttribute('wire:id');

    return new RunningTransition(parentId, duration, end, () => {
        console.log('remove animation');
        node.style.animation = 'none';
    });
}
