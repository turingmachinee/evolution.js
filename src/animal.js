import * as THREE from "three";
import * as Environment from "./environment"
import Utils from "./utils"

export default class Animal {
    constructor(worldMesh) {
        let speed_x = Utils.randomNumber(1, 100);
        let speed_y = Utils.randomNumber(1, 100);
        let strength = Utils.randomNumber(1, 100);
        let swim = Utils.randomNumber(1, 100);
        let max_uv_exposure = Utils.randomNumber(1, 100);
        let size_x = Utils.randomNumber(1, 4);
        let size_y = Utils.randomNumber(1, 4);
        let geometry = new THREE.BoxGeometry(size_x, size_y, size_x);
        let material = new THREE.MeshBasicMaterial({ color: "#f6f6f6" });
        this.mesh = new THREE.Mesh(geometry, material);
        let x = Utils.randomNumber(-Utils.getWidth(worldMesh)/2, Utils.getWidth(worldMesh)/2)
        let y = Utils.getHeight(this.mesh)/2
        let z = Utils.randomNumber(-Utils.getDepth(worldMesh)/2, Utils.getDepth(worldMesh)/2)
        this.mesh.position.set(x, y, z)
    }
}

// class Animal:
//     def __init__(self):
//         self.entity = Entity(model='cube', color=color.hex("FFF000"),
//                              scale_x=self.size_x, scale_y=self.size_x,
//                              position=(random.uniform(-environment.WINDOW_X, environment.WINDOW_X),
//                                        random.uniform(-environment.WINDOW_Y, environment.WINDOW_Y),
//                                        0),
//                              collider='box')
//
//     def get_colour_from_size(self):
//         decimal = 70000 + self.entity.scale_x * 65536
//         return '#' + str(decimal)