import Direction from './direction';

let keyboardBindings: {[keyName: string]: Direction} = {
    ArrowUp: Direction.TOP,
    ArrowRight: Direction.RIGHT,
    ArrowDown: Direction.BOTTOM,
    ArrowLeft: Direction.LEFT,

    KeyW: Direction.TOP,
    KeyD: Direction.RIGHT,
    KeyS: Direction.BOTTOM,
    KeyA: Direction.LEFT
}

export default class KeyboardHandler {
    /**
     * A callback to be triggered when a direction button is pressed.
     */
    public onDirection: (direction: Direction) => void = () => {};

    constructor() {
        document.addEventListener("keydown", this.onkeydown.bind(this));
    }

    onkeydown(ev: KeyboardEvent) {
        if (ev.code in keyboardBindings)
            this.onDirection(keyboardBindings[ev.code]);
    }
}