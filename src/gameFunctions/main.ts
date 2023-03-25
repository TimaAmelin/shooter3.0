import { Bullet } from './../classes/Bullet';
import { BuffPlacer } from './../classes/BuffPlacer';
import { MonsterSummoner } from './../classes/MonsterSummoner';
import { Rooms } from './../classes/Rooms';
import { Background } from './../classes/Background';
import { Cursor } from './../classes/Cursor';
import { Player } from "../classes/Player";
import { Weapon } from "../classes/Weapon";

export const gameStart = (context: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement) => {
    if (!context) return;

    const player = new Player();

    const weapon = new Weapon();

    const cursor = new Cursor();

    const backgroundOverlap = new Background('background overlap.png');
    const background = new Background('playingbackground.png');

    const rooms = new Rooms();

    const monsterSummoner = new MonsterSummoner();

    const buffPlacer = new BuffPlacer(player, monsterSummoner);

    let pause = false;

    let cheatCode = [76, 79, 79, 67, 77, 73, 84];

    let gameEngine: () => void;

    const nextGameStep = (function () {
        return requestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 1000 / 60);
            };
    })();

    const gameEngineStart = (callback: () => void) => {
        gameEngine = callback;
        gameEngineStep();
    };

    const gameEngineStep = () => {
        gameEngine();
        nextGameStep(gameEngineStep);
    };

    const gameLoop = () => {
        if (playing) {
            if (!pause)
            {
                player.handleMovement(rooms, cheatCode, buffPlacer, isKeyDown);
                monsterSummoner.summon(player);
                monsterSummoner.move(rooms, player);

                buffPlacer.place(player);
                
                if (!player.canShoot || player.cheating) {
                    player.ammo += player.maxAmmo / 100;
                    if (player.ammo >= player.maxAmmo) {
                        player.ammo = player.maxAmmo;
                        player.canShoot = true;
                    }
                }
            
                if (cursor.x >= player.shownx + 30) {
                    player.orientation = 'right';
                    weapon.orientation = 'right';
                } else {
                    player.orientation = 'left';
                    weapon.orientation = 'left';
                };
            
                background.draw(context, player);
            
                player.bullets.map(bullet => {
                    if (bullet.distance > 0) {
                        bullet.move(rooms, monsterSummoner.monsters, player);
                        bullet.draw(context, player);
                    };
                });
            
                buffPlacer.draw1(context, player);
                monsterSummoner.draw1(context, player);
                player.draw(context);
                player.drawHP(context);
                // weapon.draw(context, player, cursor);
                buffPlacer.draw2(context, player);
                monsterSummoner.draw2(context, player);
                
                if (!player.cheating) {
                    backgroundOverlap.draw(context, player);
                };
                
                if (context) {
                    context.fillStyle = 'white';
                    context.font = 'Bold 30px Arial';
                    context.fillText('Score: ' + player.score, 20, 40);
                };
            
                spaceTimer--;

                if (player.hp <= 0) {
                    playing = false;
                };

                // if (player.score === 1 && !monsterSummoner.boss) {
                //     monsterSummoner.boss = wizard;
                // }

                context && context.drawImage(cursor.image, cursor.x, cursor.y);
            } else {
                if (context) {
                    context.fillStyle = 'white';
                    context.fillRect(0, 0, 800, 600);
                    context.fillStyle = 'black';
                    context.font = 'Bold 50px Arial';
                    context.fillText('Click  to continue', 200, 200);
                    context.fillText('Press Enter to restart', 150, 300);
                    context.drawImage(cursor.image, cursor.x, cursor.y);
                };
            }
        } else {
            if (context) {
                context.fillStyle = 'white';
                context.fillRect(0, 0, 800, 600);
                context.fillStyle = 'black';
                context.font = 'Bold 40px Arial';
                context.fillText('You are a tasty cheesy toast...', 120, 100);
                context.fillText('...in a field full of monsters!', 155, 150);
                context.font = 'Bold 30px Arial';
                context.fillText("Don't let them get to your cheese!", 160, 230);
                context.fillText('Move - "AWSD"   Shoot - "Mouse"   Reload - "R"', 70, 310);
                context.font = 'Bold 50px Arial';
                context.fillText('Press Enter to start', 170, 450);
                context.drawImage(cursor.image, cursor.x, cursor.y);
            };
        };
    };

    const keys = {
        'W': 87,
        'S': 83,
        'A': 65,
        'D': 68,
        ' ': 32
    };

    let keyDown = {
        87: false,
        83: false,
        65: false,
        68: false,
        32: false
    };

    let spaceTimer = 0;

    let playing = false;

    const isKeyDown = (keyName: 'W' | 'S' | 'A' | 'D' | ' ') => {
        return keyDown[keys[keyName] as (87 | 83 | 65 | 68 | 32)] == true;
    };

    const clearKey = (keyCode : 87 | 83 | 65 | 68 | 32) => {
        keyDown[keyCode] = false;
    };

    const setKey = (keyCode: 87 | 83 | 65 | 68 | 32) => {
        keyDown[keyCode] = true;
    };

    window.onkeydown = function (e) {
        // if (e.keyCode == 32) {
        //     e.preventDefault();
        //     if (spaceTimer <= 0) {
        //         player.nextSkin();
        //     };
        // };
        setKey(e.keyCode as 87 | 83 | 65 | 68 | 32);
        if (e.keyCode === cheatCode[cheatCode.length - 1]) {
            if (cheatCode.length === 1) {
                player.godMode();
                console.log('Добро пожаловать в режим бога! Теперь вы бессмертны и можете ходить сквозб стены и над лавой, также ваша скорость и количество выстрелов увеличена, а монстры умирают от соприкосновения с вами! Удачи в создании монстриного армагеддона!');
            };
            cheatCode.pop();
        };
        if (e.keyCode === 27) {
            pause = true;
        } else if (!pause || e.keyCode !== 13) {
            pause = false;
        }
        if (e.keyCode === 82) {
            player.canShoot = false;
        }
        if (pause && e.keyCode === 13) {
            player.x = 1000;
            player.y = 1000;
            player.hp = 100;
            player.score = 0;
            player.vSpeed = 4;
            player.hSpeed = 5;
            player.bulletSkin = 'bullet';
            player.bulletIncX = 42;
            player.bulletIncY = 67;
            player.ammo = 10;
            player.canShoot = true;

            cheatCode = [76, 79, 79, 67, 77, 73, 84];
            
            monsterSummoner.monsters = [];
            buffPlacer.buffs = [];
            player.bullets = [];

            playing = true;
            pause = false;
        }
        if (!playing && e.keyCode === 13) {
            player.x = 1000;
            player.y = 1000;
            player.hp = 100;
            player.score = 0;
            player.vSpeed = 4;
            player.hSpeed = 5;
            player.bulletSkin = 'bullet';
            player.bulletIncX = 42;
            player.bulletIncY = 67;
            player.ammo = 10;
            player.maxAmmo = 10;
            player.canShoot = true;

            cheatCode = [76, 79, 79, 67, 77, 73, 84];
            
            monsterSummoner.monsters = [];
            buffPlacer.buffs = [];
            player.bullets = [];

            playing = true;
        }
    };

    window.onkeyup = e => {
        clearKey(e.keyCode as 87 | 83 | 65 | 68 | 32);
    };

    window.onmousemove = e => {
        if (e.target === canvas) {
            cursor.x = e.offsetX - 16;
            cursor.y = e.offsetY - 16;
        };
    };

    window.onclick = e => {
        e.preventDefault();
        if (playing) {
            pause = false;
            if (e.target === canvas) {
                let angle = Math.atan((cursor.y - player.showny - 55 + Math.floor(Math.random() * 60 - 30)) / (cursor.x - player.shownx - 30 + Math.floor(Math.random() * 36 - 18)));
                
                if (angle * weapon.angle < -0.5) {
                    angle += Math.PI;
                };
                if (player.orientation === 'left') {
                    angle += Math.PI;
                };
                
                if (player.canShoot || player.cheating) {
                    const bullet = new Bullet(player.x + player.bulletIncX, player.y + player.bulletIncY, angle, player.bulletSkin, player.damage);
                    player.bullets.push(bullet);
                    player.ammo--;
                    if (player.ammo <= 0) {
                        player.canShoot = false;
                    }
                }
    
                if (player.cheating) {
                    const n = 4;
                    for (let i = 0; i < n - 1; i++) {
                        angle += 2 * Math.PI / n;
                        const bullet = new Bullet(player.x + player.bulletIncX, player.y + player.bulletIncY, angle, player.bulletSkin, player.bulletDamage);
                        player.bullets.push(bullet);
                    }
                };
            };
        }
    };
    


    gameEngineStart(gameLoop);
}


