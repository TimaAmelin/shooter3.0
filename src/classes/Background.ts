import { Player } from './Player';

export class Background {
    public image: HTMLImageElement;
    constructor (name: string) {
        this.image = new Image();
        this.image.src = `./images/${name}`;
    }

    public draw (ctx: CanvasRenderingContext2D | null, plr: Player) {
        ctx && ctx.drawImage(this.image, plr.shownx - plr.x, plr.showny - plr.y);
    }
};