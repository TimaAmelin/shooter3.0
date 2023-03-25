export class Rooms {
    isInRoom1 (x: number, y: number) {
        return x >= 615 && x <= 1380 && y >= 610 && y <= 1320;
    }

    isInRoom2 (x: number, y: number) {
        return x >= 615 && x <= 1695 && y >= 1634 && y <= 2002;
    }
    
    isInRoom3 (x: number, y: number) {
        return x >= 615 && x <= 1695 && y >= 2318 && y <= 3202;
    }

    isInRoom4 (x: number, y: number) {
        return x >= 2000 && x <= 3145 && y >= 610 && y <= 2002;
    }

    isInRoom5 (x: number, y: number) {
        return x >= 2000 && x <= 3145 && y >= 2318 && y <= 3202;
    }


    isOnBridge1 (x: number, y: number) {
        return x >= 930 && x <= 1065 && y >= 1266 && y <= 1662;
    }

    isOnBridge2 (x: number, y: number) {
        return x >= 1435 && x <= 1570 && y >= 1954 && y <= 2346;
    }
    
    isOnBridge3 (x: number, y: number) {
        return x >= 1685 && x <= 2010 && y >= 2834 && y <= 2970;
    }

    isOnBridge4 (x: number, y: number) {
        return x >= 2505 && x <= 2640 && y >= 1950 && y <= 2346;
    }

    isOnBridge5 (x: number, y: number) {
        return x >= 1370 && x <= 2010 && y >= 894 && y <= 1034;
    }

    isLegalPlace (x: number, y: number) {
        return this.isInRoom1(x, y) ||
            this.isInRoom2(x, y) ||
            this.isInRoom3(x, y) ||
            this.isInRoom4(x, y) ||
            this.isInRoom5(x, y) ||
            this.isOnBridge1(x, y) ||
            this.isOnBridge2(x, y) ||
            this.isOnBridge3(x, y) ||
            this.isOnBridge4(x, y) ||
            this.isOnBridge5(x, y);
    }
};