import { Vector2D } from "./vector2D.js";

export const CollisionType = Object.freeze({
    SURFACE: 'surface',
    WALL_LEFT: 'wall_left',
    WALL_RIGHT: 'wall_right'
});

export class CollisionInfo {
    constructor({type, normal, target = null, rectTop = 0}){
        this.type = type;
        this.normal = normal;
        this.target = target;
        this.rectTop = target;
    }
}