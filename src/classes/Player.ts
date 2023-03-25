import { Bullet } from './Bullet';
import { BuffPlacer } from './BuffPlacer';
import { Rooms } from "./Rooms";

export class Player {
    public orientation: 'left' | 'right';
    private skinLeft: HTMLImageElement;
    private skinRight: HTMLImageElement;
    public x: number;
    public y: number;
    public shownx: number;
    public showny: number;
    public vSpeed: number;
    public hSpeed: number;
    public bulletSkin: string;
    public bulletIncX: number;
    public bulletIncY: number;
    public bulletDamage: number;
    public hp: number;
    public score: number;
    public ammo: number;
    public maxAmmo: number;
    public canShoot: boolean;
    public damage: number;
    public cheating: boolean;
    public bullets: Bullet[];

    constructor () {
        this.orientation = 'right';
        this.skinLeft = new Image();
        this.skinLeft.src = `./images/characters/sandwich left.png`;
        this.skinRight = new Image();
        this.skinRight.src = `./images/characters/sandwich right.png`;
        this.x = 1000;
        this.y = 1000;
        this.shownx = 350;
        this.showny = 250;
        this.vSpeed = 4;
        this.hSpeed = 5;
        this.bulletSkin = 'bullet'
        this.bulletIncX = 42;
        this.bulletIncY = 67;
        this.bulletDamage = 25;
        this.hp = 100;
        this.score = 100;
        this.ammo = 10;
        this.maxAmmo = 10;
        this.canShoot = true;
        this.damage = 25;
        this.cheating = false;
        this.bullets = [];
    }

    // private nextSkin () {
    //     const curNumber = playerSkins.indexOf(this.skinName);
    //     if (curNumber === playerSkins.length - 1) {
    //         this.skinName = playerSkins[0];
    //     } else {
    //         this.skinName = playerSkins[curNumber + 1];
    //     };
    // }

    private left (rooms: Rooms, c: number) {
        if (!c || rooms.isLegalPlace(this.x - this.hSpeed, this.y)) {
            this.x -= this.hSpeed;
        };
    }

    private right (rooms: Rooms, c: number) {
        if (!c || rooms.isLegalPlace(this.x + this.hSpeed, this.y)) {
            this.x += this.hSpeed;
        };
    }

    private down (rooms: Rooms, c: number) {
        if (!c || rooms.isLegalPlace(this.x, this.y + this.vSpeed)) {
            this.y += this.vSpeed;
        };
    }

    private up (rooms: Rooms, c: number) {
        if (!c || rooms.isLegalPlace(this.x, this.y - this.vSpeed)) {
            this.y -= this.vSpeed;
        };
    }

    public drawHP (ctx: CanvasRenderingContext2D | null) {
        if (!ctx) return;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.shownx - 6, this.showny - 25, 106, 20);
        ctx.fillStyle = 'red';
        ctx.fillRect(this.shownx - 3, this.showny - 22, this.hp, 14);
        ctx.fillStyle = 'gold';
        ctx.fillRect(this.shownx - 3, this.showny - 13, this.ammo / this.maxAmmo * 100, 6);
    }

    public draw (ctx: CanvasRenderingContext2D | null) {
        ctx && ctx?.drawImage(this.orientation === 'left' ? this.skinLeft : this.skinRight, this.shownx, this.showny);
    }

    public handleMovement (
        rooms: Rooms,
        cheatCode: number[],
        buffPlacer: BuffPlacer,
        isKeyDown: any
    ) {
        if (isKeyDown('W')) {
            this.up(rooms, cheatCode.length);
        };
        if (isKeyDown('S')) {
            this.down(rooms, cheatCode.length);
        };
        if (isKeyDown('A')) {
            this.left(rooms, cheatCode.length);
        };
        if (isKeyDown('D')) {
            this.right(rooms, cheatCode.length);
        };
        buffPlacer.buffs.map(buff => {
            if (Math.abs(buff.x - 24 - this.x) <= 30 && Math.abs(buff.y - 20 - this.y) <= 50 && !buff.taken) {
                buff.taken = true;
                buff.effect();
            }
        })
    }

    public godMode () {
        this.hSpeed = 8;
        this.vSpeed = 10;
        this.bulletSkin = 'bulletc'
        this.bulletIncX = 32;
        this.bulletIncY = 60;
        this.cheating = true;
    }
};