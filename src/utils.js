import * as THREE from "three";

export default class Utils {
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getWidth(mesh) {
        let boundingBox = new THREE.Box3().setFromObject(mesh);
        return boundingBox.max.x - boundingBox.min.x;
    }

    static getHeight(mesh) {
        let boundingBox = new THREE.Box3().setFromObject(mesh);
        return boundingBox.max.y - boundingBox.min.y;
    }

    static getDepth(mesh) {
        let boundingBox = new THREE.Box3().setFromObject(mesh);
        return boundingBox.max.z - boundingBox.min.z;
    }

    static getRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}