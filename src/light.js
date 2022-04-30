import * as THREE from "three";

export default class Light {
    constructor(size, positionX, positionY, positionZ, colour, intensity) {
        const lightArea = size / 2;

        this.light = new THREE.DirectionalLight(colour, intensity);
        this.light.castShadow = true

        // Set light position
        this.light.position.set(positionX, positionY, positionZ);
        this.light.shadow.camera.left = -lightArea;
        this.light.shadow.camera.right = lightArea;
        this.light.shadow.camera.top = lightArea;
        this.light.shadow.camera.bottom = -lightArea;

        // Set up shadow properties for the light
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        this.light.shadow.camera.far =
            Math.sqrt(Math.pow(this.light.position.x, 2)
                + Math.pow(this.light.position.y, 2)
                + Math.pow(this.light.position.z, 2))
            + size;
    }
}