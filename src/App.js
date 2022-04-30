import './App.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
function App() {
  return (
    <div />
  );
}

let WORLD_SIZE = 50;

window.addEventListener('resize', onWindowResize);  // Window resize event listener

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Framerate
let stats = new Stats();
document.body.appendChild(stats.dom);

// Light helper
// const helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);

var geometry = new THREE.BoxGeometry(WORLD_SIZE, 1, WORLD_SIZE);
var material = new THREE.MeshBasicMaterial({ color: "#6d6363" });
var ground = new THREE.Mesh(geometry, material);
scene.add(ground);

camera.position.x = 25;
camera.position.y = 45;
camera.position.z = 40;

controls.update();
var animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  renderer.render(scene, camera);
};
animate();

// Returns true if object1 and object2 intersect
function detectCollision(object1, object2) {
  object1.geometry.computeBoundingBox();
  object2.geometry.computeBoundingBox();
  object1.updateMatrixWorld(true);
  object2.updateMatrixWorld(true);

  let box1 = object1.geometry.boundingBox.clone();
  box1.applyMatrix4(object1.matrixWorld);
  let box2 = object2.geometry.boundingBox.clone();
  box2.applyMatrix4(object2.matrixWorld);

  return box1.intersectsBox(box2);
}

function onWindowResize() {
  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    // Scale camera zoom with viewport dimensions
    if (window.innerWidth > window.innerHeight) {
      camera.zoom = window.innerHeight / window.innerHeight;
    } else {
      camera.zoom = window.innerWidth / window.innerHeight;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, 100);
}

export default App;
