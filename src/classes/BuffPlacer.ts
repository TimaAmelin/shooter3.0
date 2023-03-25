import { room } from './../types/gameTypes';
import { Buff } from "./Buff";
import { MonsterSummoner } from "./MonsterSummoner";
import { Player } from "./Player";

export class BuffPlacer {
    private timer: number;
    public buffs: Buff[];
    private rooms: room[];
    public player: Player;
    public monsterSummoner: MonsterSummoner;

    constructor (
        player: Player,
        monsterSummoner: MonsterSummoner
    ) {
        this.timer = 0;
        this.buffs = [];
        this.rooms = [
            {
                left: 615,
                right: 1380,
                top: 610, 
                bottom: 1320
            },
            {
                left: 615,
                right: 1695,
                top: 1634, 
                bottom: 2002
            },
            {
                left: 615,
                right: 1695,
                top: 2318, 
                bottom: 3202
            },
            {
                left: 2000,
                right: 3145,
                top: 610, 
                bottom: 2002
            },
            {
                left: 2000,
                right: 3145,
                top: 2318, 
                bottom: 3202
            }
        ];
        this.player = player;
        this.monsterSummoner = monsterSummoner;
    };

    public heal(buffPlacer: BuffPlacer) {
        buffPlacer.player.hp += 25;
        if (buffPlacer.player.hp > 100) {
            buffPlacer.player.hp = 100;
        };
    }

    public bullet (buffPlacer: BuffPlacer) {
        buffPlacer.player.damage += 10;
    }

    public ammo (buffPlacer: BuffPlacer) {
        buffPlacer.player.ammo += 2;
        buffPlacer.player.maxAmmo += 2;
    }

    public speed (buffPlacer: BuffPlacer) {
        if (buffPlacer.player.vSpeed < 8) {
            buffPlacer.player.vSpeed *= 1.1;
            buffPlacer.player.hSpeed *= 1.1;
        };
    }

    public clear (buffPlacer: BuffPlacer) {
        buffPlacer.monsterSummoner.monsters = [];
    }

    public place (player: Player) {
        if (this.timer > 0) {
            this.timer--;
        } else  if (this.timer != -1) {
            const coords = this.generateCoords(player);
            const buffArray: string[] = [];
            for (let i = 0; i < 10; i++) {
                buffArray.push('ammo');
            };
            for (let i = 0; i < 7; i++) {
                buffArray.push('heal');
            };
            if (player.score > 20 && player.vSpeed < 8) {
                for (let i = 0; i < 3; i++) {
                    buffArray.push('speed');
                };
            };
            if (player.score > 50) {
                for (let i = 0; i < 3; i++) {
                    buffArray.push('bullet');
                };
            }
            if (player.score > 100) {
                buffArray.push('clear');
            };
            const buffCoefficient = Math.floor(Math.random() * buffArray.length);
            const buffType = buffArray[buffCoefficient];
            const buff = new Buff(
                coords.x,
                coords.y,
                buffType,
                buffType === 'bullet' ?
                    this.bullet :
                    buffType === 'heal' ? 
                        this.heal :
                        buffType === 'ammo' ?
                            this.ammo :
                            buffType === 'clear' ?
                                this.clear :
                                this.speed,
                this
            );
            this.buffs.push(buff);
            this.timer = 20 + 400 / (player.score / 50 + 1);
        };
    }

    private generateCoords (player: Player) {
        const roomNumber = Math.floor(Math.random() * 5);
        let x = Math.floor(Math.random() * (this.rooms[roomNumber].right - this.rooms[roomNumber].left + 1) + this.rooms[roomNumber].left);
        let y = Math.floor(Math.random() * (this.rooms[roomNumber].bottom - this.rooms[roomNumber].top + 1) + this.rooms[roomNumber].top);
        while (Math.abs(player.x - x) <= 150 && Math.abs(player.y - y) <= 150) {
            x = Math.floor(Math.random() * (this.rooms[roomNumber].right - this.rooms[roomNumber].left + 1) + this.rooms[roomNumber].left);
            y = Math.floor(Math.random() * (this.rooms[roomNumber].bottom - this.rooms[roomNumber].top + 1) + this.rooms[roomNumber].top);
        };
        return ({x, y});
    }

    public draw1 (ctx: CanvasRenderingContext2D | null, player: Player) {
        this.buffs.sort((buff1, buff2) => buff1.y - buff2.y).map(buff => {
            if (buff.y < player.y && !buff.taken) {
                buff.draw(ctx, player);
            };
        });
    }

    public draw2 (ctx: CanvasRenderingContext2D | null, player: Player) {
        this.buffs.sort((buff1, buff2) => buff1.y - buff2.y).map(buff => {
            if (buff.y >= player.y && !buff.taken) {
                buff.draw(ctx, player);
            };
        });
    }
}