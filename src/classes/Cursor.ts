export class Cursor {
    public x: number;
    public y: number;
    public image: HTMLImageElement;

    constructor () {
        this.x = 0;
        this.y = 0;
        this.image = new Image(32, 32);
        this.image.src = './images/cursor.png';
    }
};