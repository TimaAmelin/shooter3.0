export type monsterSkinsType = {
    level1: Partial<monsters>[];
    level2: Partial<monsters>[];
    level3: Partial<monsters>[];
    level4: Partial<monsters>[];
}

export type monsterLevelsType = {
    brain: number;
    bug: number;
    clown: number;
    demon: number;
    droid: number;
    monster: number;
    skeleton: number;
    water: number;
    werewolf: number;
    zombie: number;
}

export type room = {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export type monsters = 'brain' | 'bug' | 'clown' | 'demon' | 'droid' | 'monster' | 'skeleton' | 'water' | 'werewolf' | 'zombie';