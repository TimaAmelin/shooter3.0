import { Cursor } from "./Cursor";
import { Player } from "./Player";

export class Weapon {
    public skinName: string;
    public orientation: 'left' | 'right';
    public skin: HTMLImageElement;
    public shownx: number;
    public showny: number;
    public angle: number;

    constructor () {
        this.skinName = 'Pythagoras';
        this.orientation = 'right';
        this.skin = document.getElementById(this.skinName + ' ' + this.orientation) as HTMLImageElement;
        this.shownx = 375;
        this.showny = 275;
        this.angle = 0;
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player, cursor: Cursor) {
        if (!ctx) return;
        this.angle = Math.atan((cursor.y - player.showny - 55) / (cursor.x - player.shownx - 30));
    
        this.skin = document.getElementById(this.skinName + ' ' + this.orientation) as HTMLImageElement;
    
        ctx.translate(player.shownx + 47, player.showny + 74);
        ctx.rotate(this.angle);
        ctx.drawImage(this.skin, -32, -22);
        ctx.rotate(-this.angle);
        ctx.translate(-1 * player.shownx - 47, -1 * player.showny - 74);
    }
};