import { monsters, room, monsterSkinsType }  from '../types/gameTypes';
import { Monster } from './Monster';
import { Player } from './Player';
import { Rooms } from './Rooms';

export class MonsterSummoner {
    private timer: number;
    public monsters: Monster[];
    // public boss: Boss | undefined;
    private rooms: room[];
    private monsterSkins: monsterSkinsType;

    constructor () {
        this.timer = 1000;
        this.monsters = [];
        // this.boss = undefined;
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
        this.monsterSkins = {
            level1: ['water', 'clown', 'droid'],
            level2: ['brain', 'monster', 'skeleton'],
            level3: ['werewolf', 'zombie'],
            level4: ['bug', 'demon']
        };
    }

    public summon (player: Player) {
        // if (this.boss) {
        //     return
        // }
        
        if (this.timer > 0) {
            this.timer--;
            return
        }
        
        if (this.timer != -1) {
            const coords = this.generateCoords(player);
            const orientation = coords.x > player.x ? 'left' : 'right';
            const monsterWeights = {
                level1: player.score,
                level2: player.score > 20 ? 2 * (player.score - 20) : 0,
                level3: player.score > 50 ? 5 * (player.score - 50) : 0,
                level4: player.score > 100 ? 10 * (player.score - 100) : 0
            }
            const monsterCoef = Math.floor(
                Math.random() * 
                (
                    monsterWeights.level1 + monsterWeights.level2 + monsterWeights.level3 + monsterWeights.level4
                )
            );
            const monsterLevel = player.score === 0 || monsterCoef < monsterWeights.level1 ?
                'level1' : 
                monsterCoef < monsterWeights.level1 + monsterWeights.level2 ?
                    'level2' :
                    monsterCoef < monsterWeights.level1 + monsterWeights.level2 + monsterWeights.level3 ?
                        'level3':
                        'level4';

            const monster = new Monster(
                this.monsterSkins[monsterLevel][
                    Math.floor(Math.random() * this.monsterSkins[monsterLevel].length)
                ] as monsters,
                coords.x,
                coords.y,
                orientation
            );
            this.monsters.push(monster);
            this.timer = 20 + 80 / (player.score / 50 + 1);
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
        this.monsters.sort((monster1, monster2) => monster1.y - monster2.y).map(monster => {
            if (monster.y < player.y && monster.alive && ctx) {
                ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                ctx.fillStyle = 'black';
                ctx.fillRect(monster.x - player.x + player.shownx - 6, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                ctx.fillStyle = 'red';
                ctx.fillRect(monster.x - player.x + player.shownx - 3, monster.y - player.y + player.showny - 22, monster.health, 14);
            };
        });
    }

    public draw2 (ctx: CanvasRenderingContext2D | null, player: Player) {
        this.monsters.sort((monster1, monster2) => monster1.y - monster2.y).map(monster => {
            if (monster.y >= player.y && monster.alive && ctx) {
                ctx.drawImage(monster.skin, monster.x - player.x + player.shownx, monster.y - player.y + player.showny);
                ctx.fillStyle = 'black';
                ctx.fillRect(monster.x - player.x + player.shownx - 6, monster.y - player.y + player.showny - 25, monster.maxHealth + 6, 20);
                ctx.fillStyle = 'red';
                ctx.fillRect(monster.x - player.x + player.shownx - 3, monster.y - player.y + player.showny - 22, monster.health, 14);
            };
        });
    }

    public move (rooms: Rooms, player: Player) {
        this.monsters.map(monster => monster.move(rooms, player));
        // this.boss.move(player)
    }
};