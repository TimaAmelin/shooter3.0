import { Monster } from "./Monster";
import { Player } from "./Player";
import { Rooms } from "./Rooms";

export class Bullet {
    public x: number;
    public y: number;
    public angle: number;
    public image: HTMLImageElement;
    public speed: number;
    public distance: number;
    public damage: number;

    constructor (x: number, y: number, angle: number, image: string, damage: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.image = new Image();
        this.image.src = `./images/${image}.png`;
        this.speed = 10;
        this.distance = 30;
        this.damage = damage;
    }

    public move (rooms: Rooms, monsters: Monster[], player: Player) {
        if (rooms.isLegalPlace(this.x + Math.cos(this.angle) * this.speed - 23, this.y + Math.sin(this.angle) * this.speed - 40) ||
        rooms.isLegalPlace(this.x + Math.cos(this.angle) * this.speed - 80, this.y + Math.sin(this.angle) * this.speed - 70) || player.cheating) {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            monsters.map(monster => {
                if (Math.abs(this.x - monster.x - 50) <= 30 && Math.abs(this.y - monster.y - 50) <= 50 && this.distance > 0 && monster.alive) {
                    monster.health -= this.damage;
                    if (monster.health <= 0) {
                        monster.alive = false;
                        player.score += 1;
                    };
                    if (player.cheating) {
                        monster.alive = false;
                    }
                    this.distance = 0;
                };
            });
            this.distance--;
        } else {
            this.distance = 0;
        };
    }

    public draw (ctx: CanvasRenderingContext2D | null, player: Player) {
        ctx && ctx.drawImage(this.image, this.x - player.x + player.shownx, this.y - player.y + player.showny);
    }
};