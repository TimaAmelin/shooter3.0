import { BuffPlacer } from './BuffPlacer';
import { Player } from './Player';

export class Buff {
    public x: number;
    public y: number;
    public image: HTMLImageElement;
    public imageName: string;
    public taken: boolean;
    public powerup: (buffPlacer: BuffPlacer) => void;
    public buffPlacer: BuffPlacer

    constructor (
        x: number,
        y: number,
        image: string,
        powerup: (buffPlacer: BuffPlacer) => void,
        buffPlacer: BuffPlacer
    ) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = `./images/powerups/${image}_powerup.png`;
        this.imageName = image;
        this.taken = false;
        this.powerup = powerup;
        this.buffPlacer = buffPlacer;
    }
    
    public draw (ctx: CanvasRenderingContext2D | null, player: Player) {
        ctx && ctx.drawImage(this.image, this.x - player.x + player.shownx, this.y - player.y + player.showny);
    }

    public effect() {
        this.powerup(this.buffPlacer);
    }
}