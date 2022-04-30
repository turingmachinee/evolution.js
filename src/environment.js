import * as THREE from "three";
import {seededRandom} from "three/src/math/MathUtils";
import Utils from "./utils"

export class Water {
    constructor() {
        let size = Utils.randomNumber(1, 10);
        let depth = Utils.randomNumber(1, 100);
        this.mesh = null;
    }
    get_colour_from_depth() {
        return null;
    }
}

export class Food {
    constructor() {
        let size = Utils.randomNumber(0.5, 3);
        let nutrition = size;
        this.mesh = null;
    }
}

export class Sun {
    constructor() {
        this.mesh = null;
        let heat = Utils.randomNumber(1, 1000);
        let uv = Utils.randomNumber(1, 1000);
    }
}

export class Terrain {
    constructor() {
        this.mesh = null;
    }
}

export class Disease {
    constructor() {
        let malaria = Utils.randomNumber(1, 100);
        let typhus = Utils.randomNumber(1, 100);
        let bubonic_plague = Utils.randomNumber(1, 100);
    }
}

// class Terrain:
//     def __init__(self):
//         mountain = Entity(model='pyramid', color=color.green, scale_y=0.1, scale_x=0.1)
//         forest = Entity(model='cylinder', color=color.green)
//         rock = Entity(model='cube', color=color.gray)
//         shrooms = Entity(model='circle', color=color.gray)
//         grass = Entity(model='square', color=color.green)
//         fire = Entity(model='triangle', color=color.red)
